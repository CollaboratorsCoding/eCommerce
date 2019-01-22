const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
	author: { type: String, required: true },
	text: { type: String, required: true },
	rating: { type: Number },
	upvotes: { type: Number, default: 0 },
	downvotes: { type: Number, default: 0 },
	parentSlug: { type: String, required: true },
	parentReviewId: { type: mongoose.Schema.Types.ObjectId },
	date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Review', ReviewSchema);
