import React from 'react';
import { Table, Icon, Label, Image } from 'semantic-ui-react';

export default function ItemCart({
	product,
	handleAddProduct,
	handleRemoveProduct,
	handleReduceProduct,
}) {
	const { item, price, qty } = product;
	return (
		<Table.Row>
			<Table.Cell>
				<Image
					className="title-wrapper--img"
					size="mini"
					src={item.imagePath}
				/>
			</Table.Cell>
			<Table.Cell>
				<div className="title-wrapper--text">{item.title}</div>
			</Table.Cell>
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
				<div className="shopping-cart-section-body-table--wrapper">
					<Icon name="usd" />
					{price}
					<Icon
						className="shopping-cart-section-body-table--wrapper__icon-delete"
						onClick={() => handleRemoveProduct(item._id)}
						color="red"
						name="trash alternate outline"
					/>
				</div>
			</Table.Cell>
		</Table.Row>
	);
}
