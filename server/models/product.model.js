const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
	imagePath: { type: String, required: true },
	title: { type: String, required: true },
	slug: { type: String },
	description: { type: String, required: true },
	price: { type: Number, required: true },
	category: { type: String, required: true },
	tags: { type: [String] },
});

module.exports = mongoose.model('Product', ProductSchema);
