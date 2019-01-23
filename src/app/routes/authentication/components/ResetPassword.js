import React, { Component } from 'react';
import { Button, Form } from 'semantic-ui-react';
import _ from 'lodash';
import withValidations from '../../../hocs/withValidations';

const userTypes = require('../../../../../server/type_models/user.types');

class ResetPasssword extends Component {
	handleSubmit = async e => {
		const { validateForm } = this.props;
		const formData = new FormData(e.target);
		const data = {};

		e.preventDefault();

		/* eslint-disable-next-line */
		for (const entry of formData.entries()) {
			data[entry[0]] = entry[1];
		}
		await validateForm(data);
		if (_.isEmpty(this.props.errors)) {
			this.props.ResetPassword(data, this.props.token);
		}
	};

	render() {
		const { errors, validateField } = this.props;
		return (
			<Form className="form" onSubmit={this.handleSubmit}>
				<h2>Enter new password</h2>
				<Form.Input
					icon="key"
					type="password"
					name="password"
					label={errors.password}
					onChange={validateField}
					iconPosition="left"
					placeholder="New Password"
					error={!!errors.password}
				/>

				<Button
					content="Save"
					icon="save"
					labelPosition="right"
					type="submit"
				/>
			</Form>
		);
	}
}

export default withValidations(userTypes.SignInForm)(ResetPasssword);
