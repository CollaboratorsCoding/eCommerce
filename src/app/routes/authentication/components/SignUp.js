import React from 'react';
import { Button, Form } from 'semantic-ui-react';

export default function SignUp({ handleSubmit, switchForm }) {
	return (
		<Form onSubmit={handleSubmit} className="form">
			<h1>Registration</h1>
			<Form.Input
				icon="mail"
				iconPosition="left"
				placeholder="Email"
				name="email"
			/>

			<Form.Input
				name="name"
				icon="user outline"
				iconPosition="left"
				placeholder="Name"
			/>

			<Form.Input
				name="address"
				icon="address book outline"
				iconPosition="left"
				placeholder="Address"
			/>
			<Form.Input
				name="phone"
				icon="phone"
				iconPosition="left"
				placeholder="Phone"
			/>
			<Form.Input
				icon="key"
				type="password"
				name="password"
				iconPosition="left"
				placeholder="Password"
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
