import _ from'lodash';
import nanoid from 'nanoid';
import Cart from '../../models/cart.model';
import RenameKeys from '../../utils/renameKeys';

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
		return res.status(403).json({ metaData: {
			notification: {
				id: nanoid(6),
				type: 'error',
				message: {
					text: 'Your cart is empty',
				},
				duration: 3.5,
			},
			redirect: {
				id: nanoid(6),
				path: '/'
			}
		},
		cart: {
			productsInCart: [],
			totalQty: 0,
			totalPrice: 0,
		},
		});
	}

	const cartArray = await cart.generateArray();
	const itemsIds = cartArray.map(product => product.item._id);

	const userId = req.session.user_id;
	const orderObj = {
		userId,
		user: { ...Orderform },
		products: cartArray,
		OrderPrice: `$ ${cart.totalPrice}`,
		OrderQty: cart.totalQty,
	};
	try {
		const newOrder = new Order(orderObj);
		const saveOrder = await newOrder.save();
		const orderRenameKey = _.omit(RenameKeys({_id: 'key'}, saveOrder.toObject()), [
			'user',
			'userId',
		]);
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
			order: orderRenameKey,
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
					id: nanoid(6),
					path: req.session.user_id?'/orders-history':'/'
				}
			},
		});
	} catch (error) {
		return res.json({ type: 'server', message: error });
	}
};

OrderContreller.OrdersHistory = (req, res) => {
	Order.find({ userId: req.user._id }, (err, orders) => {
		const mapOrders = orders.map(order => _.omit(RenameKeys({_id: 'key'}, order.toObject()), [
			'user',
			'userId',
		]))
		res.json({orders: mapOrders})
	})
	
}


export default OrderContreller;
