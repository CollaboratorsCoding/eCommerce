import React from 'react';
import { Button, Form } from 'semantic-ui-react';

function SignIn({ handleSubmit, switchForm }) {
	return (
		<Form onSubmit={handleSubmit}>
			<h1>Login</h1>
			<Form.Input
				icon="mail"
				iconPosition="left"
				placeholder="Email"
				name="email"
			/>
			<Form.Input
				icon="key"
				type="password"
				name="password"
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

export default SignIn;
