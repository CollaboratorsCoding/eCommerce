const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
	author: { type: String, required: true },
	text: { type: String, required: true },
	rating: { type: Number },
	upvotes: { type: [mongoose.Schema.Types.ObjectId], default: [] },
	parentId: { type: mongoose.Schema.Types.ObjectId, required: true },
	parentReviewId: { type: mongoose.Schema.Types.ObjectId },
	date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Review', ReviewSchema);
