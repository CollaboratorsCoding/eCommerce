import React from 'react';
import { Table, Icon, Label } from 'semantic-ui-react';

export default function ItemCart({
	product,
	handleAddProduct,
	handleRemoveProduct,
	handleReduceProduct,
}) {
	const { item, price, qty } = product;
	return (
		<Table.Row>
			<Table.Cell>{item.title}</Table.Cell>
			<Table.Cell>
				<Icon
					color="grey"
					onClick={() => handleReduceProduct(item._id)}
					size="large"
					className="shopping-cart-section-body-table-arrow"
					name="caret square left"
				/>
				<Label
					className="shopping-cart-section-body-table-quantity"
					color="teal"
				>
					{qty}
				</Label>
				<Icon
					color="grey"
					size="large"
					onClick={() => handleAddProduct(item._id)}
					className="shopping-cart-section-body-table-arrow"
					name="caret square right"
				/>
			</Table.Cell>
			<Table.Cell>
				<Icon name="usd" />
				{item.price}
			</Table.Cell>
			<Table.Cell>
				<Icon name="usd" />
				{price}
				<Icon
					className="shopping-cart-section-body-table__icon-delete"
					onClick={() => handleRemoveProduct(item._id)}
					color="red"
					name="trash alternate outline"
				/>
			</Table.Cell>
		</Table.Row>
	);
}
