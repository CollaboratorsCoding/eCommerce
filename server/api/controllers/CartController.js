import nanoid from 'nanoid';
import _ from 'lodash';
import Cart from '../../models/cart.model';
import Product from '../../models/product.model';

const CartController = {};

CartController.addToCart = (req, res) => {
	const productId = req.params.id;
	const cart = new Cart(req.session.cart ? req.session.cart : {});

	Product.findOne({ _id: productId }, (err, product) => {
		if (err) {
			return res.status(404).json({
				metaData: {
					notification: {
						id: nanoid(6),
						type: 'error',
						message: {
							text: `Unexpected Error`,
						},
						duration: 1.5,
					},
				},
			});
		}
		cart.add(product, product.id);
		req.session.cart = cart;
		return res.status(200).json({
			metaData: {
				notification: {
					id: nanoid(6),
					type: 'success',
					message: {
						header: _.truncate(product.title),
						text: ` Added To Your Cart`,
					},
					duration: 1.5,
				},
			},

			cart: {
				productsInCart: cart.generateArray(),
				totalPrice: cart.totalPrice,
				totalQty: cart.totalQty,
			},
		});
	});
};

CartController.getItemsCart = (req, res) => {
	if (!req.session.cart) {
		return res
			.status(200)
			.json({ cart: { productsInCart: [], totalQty: 0, totalPrice: 0 } });
	}

	const cart = new Cart(req.session.cart ? req.session.cart : {});
	return res.status(200).json({
		cart: {
			productsInCart: cart.generateArray(),
			totalPrice: cart.totalPrice,
			totalQty: cart.totalQty,
		},
	});
};

CartController.remove = (req, res) => {
	const productId = req.params.id;
	const cart = new Cart(req.session.cart ? req.session.cart : {});

	cart.remove(productId);
	req.session.cart = cart;
	res.status(200).json({
		metaData: {
			notification: {
				id: nanoid(6),
				type: 'success',
				message: {
					text: `Item Removed From Your Cart`,
				},
				duration: 1.5,
			},
		},

		cart: {
			productsInCart: cart.generateArray(),
			totalPrice: cart.totalPrice,
			totalQty: cart.totalQty,
		},
	});
};

CartController.removeOne = (req, res) => {
	const productId = req.params.id;
	const cart = new Cart(req.session.cart ? req.session.cart : {});

	cart.removeOne(productId);
	req.session.cart = cart;
	res.status(200).json({
		metaData: {
			notification: {
				id: nanoid(6),
				type: 'success',
				message: {
					text: `Item Removed From Your Cart`,
				},
				duration: 1.5,
			},
		},
		cart: {
			productsInCart: cart.generateArray(),
			totalPrice: cart.totalPrice,
			totalQty: cart.totalQty,
		},
	});
};
export default CartController;
