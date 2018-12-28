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
	Product.find({ category: req.query.c }, (err, products) => {
		res.json({
			products,
		});
	});
};

ProductController.getProduct = (req, res) => {
	Product.findOne({ slug: req.query.p }, (err, product) => {
		Review.estimatedDocumentCount(
			{
				parentId: product._id,
			},
			(error, count) => {
				res.json({
					product: { ...product.toJSON(), reviewCount: count },
				});
			}
		);
	});
};

ProductController.getReviews = (req, res) => {
	let limit = 20;
	let offset = 0;
	if (parseFloat(req.query.l)) {
		limit = req.query.l;
	}
	if (parseFloat(req.query.o)) {
		offset = req.query.o;
	}

	const query = Review.find({ parentId: req.params.id })
		.sort({ date: -1 })
		.skip(parseFloat(offset))
		.limit(limit);
	query.exec((error, reviews) => {
		console.log(reviews);
		res.json({
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
