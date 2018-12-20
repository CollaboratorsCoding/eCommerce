const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const UserSchema = new mongoose.Schema({
	email: {
		type: String,
		unique: true,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	address: {
		type: String,
		required: true,
	},
	phone: {
		type: String,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	role: {
		type: String,
		default: 'user',
		required: true,
	},
	resetPasswordToken: String,
	resetPasswordExpires: Date,
});

UserSchema.pre('save', function(next) {
	const user = this;
	if (!user.isModified('password')) return next();
	const hash = bcrypt.hashSync(user.password, bcrypt.genSaltSync(5), null);
	user.password = hash;
	next();
});

UserSchema.methods.validPassword = function(password) {
	return bcrypt.compareSync(password, this.password);
};

UserSchema.index({ name: 1 });
module.exports = mongoose.model('User', UserSchema);
