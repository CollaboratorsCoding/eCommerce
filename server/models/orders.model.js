const mongoose = require('mongoose');

const OrdersSchema = new mongoose.Schema({
	userId: { type: String },
	user: { type: Object, required: true },
	products: { type: Object, required: true },
	status: { type: String, default: 'not confirmed' },
	OrderPrice: { type: Number, required: true },
	OrderQty: { type: Number, required: true },
	date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Orders', OrdersSchema);
