import React from 'react';
import { Button, Form } from 'semantic-ui-react';

export default function FormShipping({
	handleSubmit,
	errors,
	form,
	handleChange,
	prev,
}) {
	const { data } = form;
	return (
		<Form>
			<Form.Input
				icon="point"
				type="text"
				name="address"
				label={errors.address}
				value={data.address}
				onChange={handleChange}
				iconPosition="left"
				placeholder="Enter your address"
				error={!!errors.address}
			/>

			<Button
				content="Previous"
				icon="arrow left"
				labelPosition="left"
				onClick={prev}
				type="button"
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
