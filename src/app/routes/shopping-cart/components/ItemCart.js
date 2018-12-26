import React from 'react';
import { Table, Icon, Label } from 'semantic-ui-react';

export default function ItemCart() {
	return (
		<Table.Row>
			<Table.Cell>Iphone x</Table.Cell>
			<Table.Cell>
				<Icon
					color="grey"
					size="large"
					className="shopping-cart-section-body-table-arrow"
					name="caret square left"
				/>
				<Label
					className="shopping-cart-section-body-table-quantity"
					color="teal"
				>
					2
				</Label>
				<Icon
					color="grey"
					size="large"
					className="shopping-cart-section-body-table-arrow"
					name="caret square right"
				/>
			</Table.Cell>
			<Table.Cell>22</Table.Cell>
			<Table.Cell>
				22
				<Icon
					className="shopping-cart-section-body-table__icon-delete"
					color="red"
					name="trash alternate outline"
				/>
			</Table.Cell>
		</Table.Row>
	);
}
