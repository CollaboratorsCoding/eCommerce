import React, { Component } from 'react';
import { Button, Form } from 'semantic-ui-react';
import withValidations from '../../../hocs/validation';

const userTypes = require('../../../../../server/type_models/user.types');

class SignIn extends Component {
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
	};

	render() {
		const { errors, switchForm } = this.props;
		console.log(errors);
		return (
			<Form onSubmit={this.handleSubmit}>
				<h1>Login</h1>
				<Form.Input
					icon="mail"
					label={errors.email}
					iconPosition="left"
					placeholder="Email"
					onChange={this.props.validateField}
					name="email"
				/>
				<Form.Input
					icon="key"
					type="password"
					name="password"
					label={errors.password}
					onChange={this.props.validateField}
					iconPosition="left"
					placeholder="Password"
				/>

				<Button
					content="Sign In"
					icon="sign-in"
					labelPosition="left"
					type="submit"
				/>
				<p>
					Not registered?{' '}
					<span
						onClick={() => switchForm('signup')}
						className="form-switch"
					>
						Create an account
					</span>
				</p>
			</Form>
		);
	}
}

export default withValidations(userTypes.SignInForm)(SignIn);
