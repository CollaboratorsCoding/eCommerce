import React from 'react';
import { Button, List } from 'semantic-ui-react';

export default function FormConfirm({ form, handleSubmit, prev }) {
	console.log(form);
	return (
		<div>
			<List>
				<List.Item>
					<List.Icon name="users" />
					<List.Content>Your Name: {form.name}</List.Content>
				</List.Item>
				<List.Item>
					<List.Icon name="mail" />
					<List.Content>
						<a href="mailto:jack@semantic-ui.com">{form.email}</a>
					</List.Content>
				</List.Item>
				<List.Item>
					<List.Icon name="phone" />
					<List.Content>{form.phone}</List.Content>
				</List.Item>
				<List.Item>
					<List.Icon name="marker" />
					<List.Content>{form.address}</List.Content>
				</List.Item>
			</List>

			<Button onClick={prev}>Previous</Button>
			<Button onClick={handleSubmit}>Confirm</Button>
		</div>
	);
}
