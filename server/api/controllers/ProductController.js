import _ from 'lodash';
import Product from '../../models/product.model';
import Review from '../../models/review.model';
import generateFilters from '../../utils/generateFilters';

const ProductController = {};

ProductController.addProduct = (req, res) => {
	const newProduct = new Product(req.body);

	newProduct.save();
	res.json({
		msg: 'Product Added Successfully',
	});
};

ProductController.getProducts = (req, res) => {
	let limit = 20;
	let page = 1;
	if (parseFloat(req.query.l)) {
		limit = req.query.l;
	}
	if (parseFloat(req.query.p)) {
		page = parseFloat(req.query.p);
	}
	const offset = parseFloat((page - 1) * limit);
	const categorySlug = req.params.category_slug;

	const filters = generateFilters(req.query);
	const query = Product.find({
		category: categorySlug,
		...(_.get(filters, 'price')
			? {
					price: {
						...(_.get(filters, 'price.min')
							? {
									$gte: parseFloat(filters.price.min),
							  }
							: {}),
						...(_.get(filters, 'price.max')
							? {
									$lte: parseFloat(filters.price.max),
							  }
							: {}),
					},
			  }
			: {}),
	})
		.skip(parseFloat(offset))
		.limit(parseFloat(limit));
	query.exec((error, products) => {
		Product.aggregate(
			[
				{
					$match: {
						category: categorySlug,
					},
				},
				{
					$group: {
						_id: null,
						max: { $max: '$price' },
						min: { $min: '$price' },
						count: {
							$sum: 1,
						},
					},
				},
			],
			(err, result) => {
				const resu = result[0];
				if (!result.length) {
					return res.status(404).json({ error: true });
				}
				const { count, max, min } = resu;
				if (!_.isEmpty(filters)) {
					Product.countDocuments(
						{
							category: categorySlug,
							...(_.get(filters, 'price')
								? {
										price: {
											...(_.get(filters, 'price.min')
												? {
														$gte: parseFloat(
															filters.price.min
														),
												  }
												: {}),
											...(_.get(filters, 'price.max')
												? {
														$lte: parseFloat(
															filters.price.max
														),
												  }
												: {}),
										},
								  }
								: {}),
						},
						(err2, count2) =>
							res.json({
								page,
								products,
								category: categorySlug,
								productsCount: count,
								filtersData: {
									max,
									min,
								},
								filtersExisting: filters,
								filteredDocsCount: count2,
							})
					);
				} else {
					return res.json({
						page,
						products,
						category: categorySlug,
						productsCount: count,
						filtersData: {
							max,
							min,
						},
						filtersExisting: filters,
						filteredDocsCount: null,
					});
				}
			}
		);
	});
};

ProductController.getProduct = (req, res) => {
	if (!req.params.slug) res.status(404).send('error');
	Product.findOne({ slug: req.params.slug }, (err, product) => {
		if (!product || err) res.status(404).send('error');
		Review.countDocuments(
			{
				parentSlug: product.slug,
			},
			(error, count) => {
				// SESSION LAST PRODUCT VISITED UPDATE
				const lastVisitedProducts = req.session.lastVisitedProducts;
				const itemIndex =
					lastVisitedProducts && lastVisitedProducts.length
						? lastVisitedProducts.findIndex(
								item => String(item._id) === String(product._id)
						  )
						: [];
				if (itemIndex === -1) {
					if (!req.session.lastVisitedProducts) {
						req.session.lastVisitedProducts = [product.toJSON()];
					} else {
						req.session.lastVisitedProducts.unshift(
							product.toJSON()
						);
					}
				} else if (lastVisitedProducts.length > 1) {
					const temp = lastVisitedProducts[itemIndex];
					const newlastVisitedProducts = lastVisitedProducts.filter(
						i => i._id !== temp._id
					);
					newlastVisitedProducts.unshift(temp);
					req.session.lastVisitedProducts = newlastVisitedProducts;
				}

				// SESSION END

				res.json({
					product: { ...product.toJSON(), reviewsCount: count },
				});
			}
		);
	});
};

ProductController.getReviews = (req, res) => {
	let limit = 10;
	let page = 1;
	if (parseFloat(req.query.l)) {
		limit = req.query.l;
	}
	if (parseFloat(req.query.p)) {
		page = req.query.p;
	}
	const offset = (page - 1) * limit;

	const query = Review.find({ parentSlug: req.params.slug })
		.sort({ date: -1 })
		.skip(parseFloat(offset))
		.limit(parseFloat(limit));
	query.exec((error, reviews) => {
		const parentIds = reviews.map(i => i._id);
		const repliesQuery = Review.find({ parentReviewId: { $in: parentIds } })
			.sort({ date: -1 })
			.limit(3);
		repliesQuery.exec((erro, replies) => {
			const reviewsWithReplies = _.map(reviews, review => {
				const repliesToReview = _.filter(
					replies,
					reply => String(reply.parentReviewId) == String(review._id)
				);

				return _.assign(review.toObject(), {
					replies: repliesToReview,
				});
			});

			res.json({
				page,
				reviews: reviewsWithReplies,
			});
		});
	});
};

ProductController.addReview = (req, res) => {
	const productSlug = req.params.slug;
	const reviewBody = req.body;

	const review = new Review({
		...reviewBody,
		parentSlug: productSlug,
	});
	review.save((error, savedReview) => {
		Product.findOneAndUpdate(
			{ slug: productSlug },
			{
				$inc: {
					votes: 1,
					rating: savedReview.rating,
				},
			},
			{ new: true },
			(err, product) => {
				res.json({ review: savedReview, product });
			}
		);
	});
};

ProductController.addReply = (req, res) => {
	const replyBody = req.body;

	const review = new Review({
		...replyBody,
		parentSlug: 'review',
	});
	review.save((error, savedReply) => {
		res.json({ reply: savedReply });
	});
};
export default ProductController;
