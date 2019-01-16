import React from 'react';
import { Button, Form } from 'semantic-ui-react';

export default function FormContact({
	errors,
	handleSubmit,
	handleChange,
	form,
}) {
	const { data } = form;
	return (
		<Form>
			<Form.Input
				icon="mail"
				label={errors.email}
				iconPosition="left"
				placeholder="Email"
				onChange={handleChange}
				value={data.email}
				name="email"
				error={!!errors.email}
			/>
			<Form.Input
				icon="user"
				type="text"
				name="name"
				label={errors.name}
				value={data.name}
				onChange={handleChange}
				iconPosition="left"
				placeholder="Enter your name"
				error={!!errors.name}
			/>
			<Form.Input
				icon="phone"
				type="text"
				name="phone"
				value={data.phone}
				label={errors.phone}
				onChange={handleChange}
				iconPosition="left"
				placeholder="Enter your phone number"
				error={!!errors.phone}
			/>

			<Button
				content="Next"
				icon="arrow right"
				labelPosition="right"
				onClick={handleSubmit}
				type="button"
			/>
		</Form>
	);
}
