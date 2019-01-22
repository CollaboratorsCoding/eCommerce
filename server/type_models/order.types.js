const Joi = require('joi-browser');

const OrederTypes = {};

OrederTypes.Orderform = {
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
};

module.exports = OrederTypes;
