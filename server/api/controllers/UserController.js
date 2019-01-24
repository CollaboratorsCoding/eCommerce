import jwt from 'jsonwebtoken';
import passport from 'passport';
import _ from 'lodash';
import nanoid from 'nanoid';
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
			metaData: {
				notification: {
					id: nanoid(6),
					type: 'error',
					message: {
						text: 'Unexpected Error',
					},
					duration: 3.5,
				},
			},
			// #TODO: changed to 'form' and handle on client errors from JOI ALL
			type: 'server',
			message: errors.error,
		});
	}
	return passport.authenticate('local.signup', (error, user) => {
		if (error) {
			return res.status(error.status).json({
				metaData: {
					notification: {
						id: nanoid(6),
						type: 'error',
						message: {
							text: _.get(error, 'message', 'Unexpected Error'),
						},
						duration: 3.5,
					},
				},
				error,
			});
		}

		const token = jwt.sign(user.toJSON(), process.env.JWT_SECRET);
		req.session.token = token;
		req.session.user_id = user._id;
		return res.json({
			metaData: {
				notification: {
					id: nanoid(6),
					type: 'success',
					message: {
						text: 'Profile Created!',
					},
					duration: 3.5,
				},
			},
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
			metaData: {
				notification: {
					id: nanoid(6),
					type: 'error',
					message: {
						text: _.get(errors, 'error', 'Unexpected Error'),
					},
					duration: 3.5,
				},
			},
			// #TODO: changed to 'form' and handle on client errors from JOI ALL
			type: 'server',
			message: errors.error,
		});
	}
	return passport.authenticate('local.signin', (error, user) => {
		if (error) {
			return res.status(401).json({
				metaData: {
					notification: {
						id: nanoid(6),
						type: 'error',
						message: {
							text: _.get(error, 'message', 'Unexpected Error'),
						},
						duration: 3.5,
					},
				},
				error,
			});
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
	req.session.user_id = null;
	res.json({
		metaData: {
			notification: {
				id: nanoid(6),
				type: 'success',
				message: {
					text: 'You are Logged Out now',
				},
				duration: 3.5,
			},
		},
		isLoggedIn: false,
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
		return res.status(403).json({
			metaData: {
				notification: {
					id: nanoid(6),
					type: 'error',
					message: {
						text: 'Unexpected error',
					},
					duration: 3.5,
				},
			},
			type: 'server',
			message: errors.error,
		});
	}
	return User.findOne({ email: req.body.email }, (err, user) => {
		if (!user) {
			return res.status(403).json({
				metaData: {
					notification: {
						id: nanoid(6),
						type: 'error',
						message: {
							text: 'Email not found.',
						},
					},
				},
			});
		}
		const reUser = user;
		reUser.resetPasswordToken = genToken(50);
		reUser.resetPasswordExpires = Date.now() + 3600000; // 1 hour
		return reUser.save(errs => {
			if (errs) {
				res.status(403).json({
					metaData: {
						notification: {
							id: nanoid(6),
							type: 'error',
							message: {
								text: 'Unexpected error',
							},
							duration: 3.5,
						},
					},
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
					resetUrl: `${req.protocol}://${req.hostname}${
						process.env.NODE_ENV !== 'production' ? ':3000' : null
					}/authentication?form=resetpassword&token=${
						user.resetPasswordToken
					}`,
				},
			});
			res.status(200).json({
				metaData: {
					notification: {
						id: nanoid(6),
						type: 'success',
						message: {
							text:
								'Email with restore link was sent. Please check you email',
						},
						duration: 4.5,
					},
					redirect: {
						id: nanoid(6),
						path: '/'
					}
				},
			});
		});
	});
};

UserController.resetPassword = (req, res) => {
	const errors = validate(req.body.password, UserTypes.SignInForm.password);

	if (errors.error) {
		// TODO: 'form'
		return res.status(403).json({
			metaData: {
				notification: {
					id: nanoid(6),
					type: 'error',
					message: {
						text: 'Unexpected error',
					},
					duration: 3.5,
				},
			},
			type: 'server',
			message: errors.error,
		});
	}
	return User.findOne(
		{
			resetPasswordToken: req.query.token,
			resetPasswordExpires: { $gt: Date.now() },
		},
		(err, user) => {
			if (!user) {
				return res.status(403).json({
					metaData: {
						notification: {
							id: nanoid(6),
							type: 'error',
							message: {
								text: 'Invalid token',
							},
							duration: 3.5,
						},
					},
					type: 'form',
					message: 'Invalid token',
					fieldName: 'password',
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
					metaData: {
						notification: {
							id: nanoid(6),
							type: 'success',
							message: {
								text: 'Password Was Changed',
							},
							duration: 3.5,
						},
						redirect: {
							id: nanoid(6),
							path: '/authentication'
						}
					},
				});
			});
		}
	);
};

export default UserController;
