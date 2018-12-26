import Product from '../../models/product.model';

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
		res.json({
			product,
		});
	});
};
export default ProductController;
