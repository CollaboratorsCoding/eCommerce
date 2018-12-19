const Joi = require('joi-browser');

const UserTypes = {};

UserTypes.SignUpForm = {
	name: Joi.string()
		.trim()
		.required(),
	address: Joi.string()
		.trim()
		.required(),
	phone: Joi.string()
		.trim()
		.required(),
	email: Joi.string()
		.email()
		.required()
		.options({
			language: {
				string: {
					base: 'No string',
					email: 'invalid email',
				},
			},
		}),
	password: Joi.string()
		.trim()
		.min(8)
		.max(30)
		.regex(/[a-zA-Z0-9]{3,30}/)
		.required(),
};

UserTypes.SignInForm = {
	email: Joi.string()
		.email()
		.required()
		.options({
			language: {
				string: {
					base: 'No string',
					email: 'invalid email',
				},
			},
		}),
	password: Joi.string()
		.min(8)
		.max(30)
		.regex(/[a-zA-Z0-9]{3,30}/)
		.required(),
};

module.exports = UserTypes;
