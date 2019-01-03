import Product from '../../models/product.model';
import Review from '../../models/review.model';

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
		page = req.query.p;
	}
	const offset = (page - 1) * limit;
	const categorySlug = req.params.category_slug;

	Product.aggregate(
		[
			{ $match: { category: categorySlug } },
			{
				$group: {
					_id: null,
					max: { $max: '$price' },
					min: { $min: '$price' },
					count: {
						$sum: 1,
					},
					doc: { $push: '$$ROOT' },
				},
			},
			{
				$project: {
					max: 1,
					min: 1,
					count: 1,
					doc: {
						$slice: ['$doc', parseFloat(offset), parseFloat(limit)],
					},
				},
			},
		],
		(err, result) => {
			console.log(result);
			const resu = result[0];
			const { count, max, min, doc } = resu;
			res.json({
				page,
				products: doc,
				category: categorySlug,
				productsCount: count,
				filters: {
					max,
					min,
				},
			});
		}
	);
};

ProductController.getProduct = (req, res) => {
	Product.findOne({ slug: req.params.slug }, (err, product) => {
		Review.countDocuments(
			{
				parentId: product._id,
			},
			(error, count) => {
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

	const query = Review.find({ parentId: req.params.id })
		.sort({ date: -1 })
		.skip(parseFloat(offset))
		.limit(parseFloat(limit));
	query.exec((error, reviews) => {
		res.json({
			page,
			reviews,
		});
	});
};

ProductController.addReview = (req, res) => {
	const productId = req.params.id;
	const reviewBody = req.body;
	Product.findOne({ _id: productId }, (err, product) => {
		if (product) {
			const review = new Review({
				...reviewBody,
				parentId: product._id,
			});
			review.save((error, savedReview) => {
				res.json({ review: savedReview });
			});
		}
	});
};

export default ProductController;
