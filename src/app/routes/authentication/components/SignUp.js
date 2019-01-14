import React, { Component } from 'react';
import { Button, Form } from 'semantic-ui-react';
import _ from 'lodash';
import withValidations from '../../../hocs/withValidations';

const userTypes = require('../../../../../server/type_models/user.types');

class SignUp extends Component {
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
			this.props.handleSignUp(data);
		}
	};

	render() {
		const { errors, validateField, switchForm } = this.props;
		return (
			<Form onSubmit={this.handleSubmit} className="form">
				<h1>Registration</h1>
				<Form.Input
					icon="mail"
					iconPosition="left"
					label={errors.email}
					placeholder="Email"
					onChange={validateField}
					name="email"
					error={errors.email}
				/>

				<Form.Input
					name="name"
					icon="user outline"
					label={errors.name}
					iconPosition="left"
					onChange={validateField}
					placeholder="Name"
					error={errors.name}
				/>

				<Form.Input
					name="address"
					icon="address book outline"
					label={errors.address}
					iconPosition="left"
					onChange={validateField}
					placeholder="Address"
					error={errors.address}
				/>
				<Form.Input
					name="phone"
					icon="phone"
					label={errors.phone}
					iconPosition="left"
					onChange={validateField}
					placeholder="Phone"
					error={errors.phone}
				/>
				<Form.Input
					icon="key"
					type="password"
					name="password"
					label={errors.password}
					iconPosition="left"
					onChange={validateField}
					placeholder="Password"
					error={errors.password}
				/>

				<Button
					content="Create"
					icon="save outline"
					labelPosition="left"
					type="submit"
				/>
				<p>
					Already registered?{' '}
					<span
						onClick={() => switchForm('signin')}
						className="form-switch"
					>
						Sign In
					</span>
				</p>
			</Form>
		);
	}
}

export default withValidations(userTypes.SignUpForm)(SignUp);
