import Category from '../../models/category.model';

const ProductController = {};

ProductController.addCategory = (req, res) => {
	const newCategory = new Category(req.body);

	newCategory.save();
	res.json({
		msg: 'Category Added Successfully',
	});
};

ProductController.getCategories = (req, res) => {
	Category.find({}, (err, categories) => {
		res.json({
			categories,
		});
	});
};
export default ProductController;
