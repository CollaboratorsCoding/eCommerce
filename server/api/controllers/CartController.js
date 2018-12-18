import Cart from '../../models/cart';
import Product from '../../models/product';

const CartController = {};

CartController.addToCart = (req, res) => {
	const productId = req.params.id;
	const cart = new Cart(req.session.cart ? req.session.cart : {});

	Product.findById(productId, (err, product) => {
		if (err) {
			return res.status(404).send('Not found');
		}
		cart.add(product, product.id);
		req.session.cart = cart;
		return res.status(200).json({
			productsInCart: cart.generateArray(),
			totalPrice: cart.totalPrice,
			totalQty: cart.totalQty,
		});
	});
};

CartController.getItemsCart = (req, res) => {
	if (!req.session.cart) {
		return res
			.status(200)
			.json({ productsInCart: [], totalQty: 0, totalPrice: 0 });
	}
	const cart = new Cart(req.session.cart);
	return res.status(200).json({
		productsInCart: cart.generateArray(),
		totalPrice: cart.totalPrice,
		totalQty: cart.totalQty,
	});
};

CartController.remove = (req, res) => {
	const productId = req.params.id;
	const cart = new Cart(req.session.cart ? req.session.cart : {});

	cart.remove(productId);
	req.session.cart = cart;
	res.status(200).json({
		productsInCart: cart.generateArray(),
		totalPrice: cart.totalPrice,
		totalQty: cart.totalQty,
	});
};

CartController.removeOne = (req, res) => {
	const productId = req.params.id;
	const cart = new Cart(req.session.cart ? req.session.cart : {});

	cart.removeOne(productId);
	req.session.cart = cart;
	res.status(200).json({
		productsInCart: cart.generateArray(),
		totalPrice: cart.totalPrice,
		totalQty: cart.totalQty,
	});
};

module.exports = CartController;
