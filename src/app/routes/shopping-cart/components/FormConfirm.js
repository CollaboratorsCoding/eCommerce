import React from 'react';
import { Button, List } from 'semantic-ui-react';

export default function FormConfirm({ form, handleSubmit, prev }) {
	return (
		<div className="confirm-order">
			<List>
				<List.Item>
					<List.Icon name="user" />
					<List.Content>{form.name}</List.Content>
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
			<Button
				content="Previous"
				icon="arrow left"
				labelPosition="left"
				onClick={prev}
				type="button"
			/>
			<Button color="teal" onClick={handleSubmit}>
				Confirm
			</Button>
		</div>
	);
}
