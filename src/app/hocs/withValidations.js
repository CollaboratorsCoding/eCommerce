import React from 'react';
import _ from 'lodash';

import { validate } from '../../../server/utils/validate';

const withValidations = (validations = {}) => Component => {
	class FormComponent extends React.Component {
		constructor() {
			super();
			this.state = {
				errors: {},
			};
		}

		componentDidUpdate(prevProps) {
			const { serverError } = this.props;

			if (
				!_.isEmpty(serverError) &&
				serverError.type === 'form' &&
				prevProps.serverError.message !== serverError.message
			) {
				const name = _.get(serverError, 'fieldName', '');
				const errMessage = serverError.message;
				const err = { [name]: errMessage };
				this.setState({ errors: err });
			}
		}

		validateField = e => {
			const name = e.target.name;
			const value = e.target.value;
			const errors = this.state.errors;
			const validator = validations[name];
			const checkErr = validate(value, validator);
			const errMessage = checkErr.error
				? checkErr.error.details[0].message
				: null;
			const err = { ...errors, [name]: errMessage };
			if (!err[name]) {
				delete err[name];
			}
			this.setState({ errors: err });
		};

		validateForm = data => {
			const stateErrors = this.state.errors;
			const errors = {};
			_.forEach(data, (value, key) => {
				const validator = validations[key];
				const checkErr = validate(value, validator);
				const errMessage = checkErr.error
					? checkErr.error.details[0].message
					: null;
				errors[key] = errMessage;
				if (!errors[key]) {
					delete errors[key];
				}
			});
			const err = { ...stateErrors, ...errors };
			this.setState({ errors: err });
		};

		render() {
			return (
				<Component
					{...this.props}
					{...this.state}
					validateForm={this.validateForm}
					validateField={this.validateField}
				/>
			);
		}
	}

	return FormComponent;
};

export default withValidations;
