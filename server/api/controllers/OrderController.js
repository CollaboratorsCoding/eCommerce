// const _ = require('lodash');
import nanoid from 'nanoid';
import Cart from '../../models/cart.model';

const Product = require('../../models/product.model');
const Order = require('../../models/orders.model');
const validate = require('../../utils/validate').validate;
const OrderTypes = require('../../type_models/order.types');

const OrderContreller = {};

OrderContreller.newOrder = async (req, res) => {
	const Orderform = { ...req.body };
	const errors = validate(Orderform, OrderTypes.Orderform);

	if (errors.error) {
		return res.status(403).json({
			// #TODO: changed to 'form' and handle on client errors from JOI ALL
			type: 'server',
			message: errors.error,
		});
	}

	const cart = new Cart(req.session.cart ? req.session.cart : {});
	if (!cart.totalQty) {
		return res.status(403).json({ message: 'Cart is empty' });
	}

	const cartArray = await cart.generateArray();
	const itemsIds = cartArray.map(product => product.item._id);

	const userId = req.session.userId;
	const orderObj = {
		userId,
		user: { ...Orderform },
		products: cartArray,
		OrderPrice: cart.totalPrice,
		OrderQty: cart.totalQty,
	};
	try {
		const newOrder = new Order(orderObj);
		await newOrder.save();
		await Product.update(
			{
				_id: { $in: itemsIds },
			},
			{
				$inc: {
					sold: 1,
				},
			},
			{ multi: true }
		);
		req.session.cart = {
			productsInCart: [],
			totalQty: 0,
			totalPrice: 0,
		};
		return res.json({
			cart: req.session.cart,
			metaData: {
				notification: {
					id: nanoid(6),
					type: 'success',
					message: {
						text: 'Your order has been sent',
					},
					duration: 3.5,
				},
				redirect: {
					path: '/'
				}
			},
		});
	} catch (error) {
		return res.json({ type: 'server', message: error });
	}
};

export default OrderContreller;
