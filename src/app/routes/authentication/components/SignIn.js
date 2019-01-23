import React, { Component } from 'react';
import { Button, Form } from 'semantic-ui-react';
import _ from 'lodash';
import withValidations from '../../../hocs/withValidations';

const userTypes = require('../../../../../server/type_models/user.types');

class SignIn extends Component {
	state = {
		forgotActive: false,
	};

	handleSubmit = async e => {
		const { validateForm } = this.props;
		const { forgotActive } = this.state;
		const formData = new FormData(e.target);
		const data = {};

		e.preventDefault();

		/* eslint-disable-next-line */
		for (const entry of formData.entries()) {
			data[entry[0]] = entry[1];
		}
		await validateForm(data);
		if (_.isEmpty(this.props.errors) && !forgotActive) {
			this.props.handleSignIn(data);
		}

		if (_.isEmpty(this.props.errors) && forgotActive) {
			this.props.sendResetLinkEmail(data);
		}
	};

	handleForgot = () => {
		const { forgotActive } = this.state;
		this.setState({
			forgotActive: !forgotActive,
		});
	};

	render() {
		const { errors, switchForm, validateField } = this.props;
		const { forgotActive } = this.state;

		if (forgotActive) {
			return (
				<Form className="form" onSubmit={this.handleSubmit}>
					<h2>Enter your email</h2>
					<Form.Input
						icon="mail"
						label={errors.email}
						iconPosition="left"
						placeholder="Email"
						onChange={validateField}
						name="email"
						error={!!errors.email}
					/>

					<p>
						<span
							onClick={this.handleForgot}
							className="form-switch"
						>
							Return to login
						</span>
					</p>

					<Button
						content="Send"
						icon="send"
						labelPosition="right"
						type="submit"
					/>
				</Form>
			);
		}

		return (
			<Form className="form" onSubmit={this.handleSubmit}>
				<h2>Login</h2>
				<Form.Input
					icon="mail"
					label={errors.email}
					iconPosition="left"
					placeholder="Email"
					onChange={validateField}
					name="email"
					error={!!errors.email}
				/>
				<Form.Input
					icon="key"
					type="password"
					name="password"
					label={errors.password}
					onChange={validateField}
					iconPosition="left"
					placeholder="Password"
					error={!!errors.password}
				/>

				<p>
					<span onClick={this.handleForgot} className="form-switch">
						Forgot password
					</span>
				</p>

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
