import jwt from 'jsonwebtoken';
import passport from 'passport';
import _ from 'lodash';
import sendEmail from '../../utils/send-email';

const User = require('../../models/user.model');
const genToken = require('../../utils/generateToken').genToken;
const validate = require('../../utils/validate').validate;
const UserTypes = require('../../type_models/user.types');

const UserController = {};

UserController.signup = (req, res, next) => {
	const SignUpform = { ...req.body };
	const errors = validate(SignUpform, UserTypes.SignUpForm);
	if (errors.error) {
		return res.status(401).json({
			// #TODO: changed to 'form' and handle on client errors from JOI ALL
			type: 'server',
			message: errors.error,
		});
	}
	return passport.authenticate('local.signup', (error, user) => {
		if (error) {
			return res.status(error.status).json(error);
		}

		const token = jwt.sign(user.toJSON(), process.env.JWT_SECRET);
		req.session.token = token;
		req.session.user_id = user._id;
		return res.json({
			isLoggedIn: true,
			user: _.omit(user.toObject(), [
				'password',
				'resetPasswordToken',
				'resetPasswordExpires',
			]),
		});
	})(req, res, next);
};

UserController.signin = (req, res, next) => {
	const SignInform = { ...req.body };
	const errors = validate(SignInform, UserTypes.SignInForm);
	if (errors.error) {
		return res.status(401).json({
			// #TODO: changed to 'form' and handle on client errors from JOI ALL
			type: 'server',
			message: errors.error,
		});
	}
	return passport.authenticate('local.signin', (error, user) => {
		if (error) {
			return res.status(401).json(error);
		}
		const token = jwt.sign(user.toJSON(), process.env.JWT_SECRET);
		req.session.token = token;
		req.session.user_id = user._id;
		const userObject = user.toObject();
		return res.json({
			isLoggedIn: true,
			user: _.omit(userObject, [
				'password',
				'resetPasswordToken',
				'resetPasswordExpires',
			]),
		});
	})(req, res, next);
};

UserController.logout = (req, res) => {
	req.session.token = null;
	res.json({
		isLoggedIn: false,
		requestSuccess: {
			message: 'You are Logged Out now',
			operation: 'user_logout',
			redirectURL: '/login',
		},
	});
};

UserController.getprofile = async (req, res) => {
	const userObject = req.user.toObject();

	res.json({
		user: _.omit(userObject, [
			'password',
			'resetPasswordToken',
			'resetPasswordExpires',
		]),
		isLoggedIn: !!req.user,
		lastVisitedProducts: req.session.lastVisitedProducts,
	});
};

UserController.editProfile = (req, res) => {
	const restrictedFields = _.omit(req.body, ['name', 'phone', 'address']);
	const key = Object.keys(req.body)[0];
	if (!_.isEmpty(restrictedFields)) {
		return res
			.status(403)
			.json({ type: 'server', message: 'Restricted field' });
	}
	const errors = validate(req.body[key], UserTypes.SignUpForm[key]);
	if (errors.error) {
		return res.status(403).json({ type: 'server', message: errors.error });
	}
	return User.findOneAndUpdate(
		{ _id: req.user._id },
		_.pick(req.body, ['name', 'age']),
		{ new: true },
		(err, user) => {
			if (err)
				return res.status(500).json({
					type: 'server',
					message: err,
				});
			const userObject = user.toObject();
			return res.json({
				user: _.omit(userObject, [
					'password',
					'resetPasswordToken',
					'resetPasswordExpires',
				]),
				requestSuccess: {
					message: 'Profile updated',
					operation: 'user_edit',
				},
			});
		}
	);
};

UserController.sendresetPassword = (req, res) => {
	const errors = validate(req.body.email, UserTypes.SignInForm.email);

	if (errors.error) {
		return res.status(403).json({ type: 'server', message: errors.error });
	}
	return User.findOne({ email: req.body.email }, (err, user) => {
		if (!user) {
			return res.status(403).json({
				type: 'form',
				message: 'Email not found.',
				formData: {
					fieldName: 'email',
					fieldValue: req.body.email,
				},
			});
		}
		const reUser = user;
		reUser.resetPasswordToken = genToken(50);
		reUser.resetPasswordExpires = Date.now() + 3600000; // 1 hour
		return reUser.save(errs => {
			if (errs) {
				res.status(403).json({
					type: 'server',
					message: errs,
				});
			}
			sendEmail({
				to: user.email,
				from: '<codenamevero@gmail.com>',
				subject: `[CodeNameVero] Password Restore!`,
				template: 'reset-password',
				templateVars: {
					title: `Password Restore!`,
					name: user.name,
					emailAddress: user.email,
					resetUrl: `${req.protocol}://${
						req.hostname
					}/resetpassword?token=${user.resetPasswordToken}`,
				},
			});
			res.status(200).json({
				requestSuccess: {
					message:
						'Email with restore link was sent. Please check you email',
					operation: 'password_reset',
					redirectURL: '/',
				},
			});
		});
	});
};

UserController.resetPassword = (req, res) => {
	const errors = validate(req.body.password, UserTypes.SignInForm.password);

	if (errors.error) {
		// TODO: 'form'
		return res.status(403).json({ type: 'server', message: errors.error });
	}
	return User.findOne(
		{
			resetPasswordToken: req.query.token,
			resetPasswordExpires: { $gt: Date.now() },
		},
		(err, user) => {
			if (!user) {
				return res.status(403).json({
					type: 'server',
					message: 'Token already expired.',
				});
			}
			const reUser = user;
			reUser.password = req.body.password;
			reUser.resetPasswordToken = undefined;
			reUser.resetPasswordExpires = undefined;
			return reUser.save(errs => {
				if (errs) {
					res.send(errs);
				}
				res.status(200).json({
					requestSuccess: {
						message: 'Password Was Changed',
						operation: 'password_change',
						redirectURL: '/login',
					},
				});
			});
		}
	);
};

export default UserController;
