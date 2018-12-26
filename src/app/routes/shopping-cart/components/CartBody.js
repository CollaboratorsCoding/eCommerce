import React from 'react';
import { Table } from 'semantic-ui-react';

import ItemCart from './ItemCart';

export default function CartBody() {
	return (
		<Table className="shopping-cart-section-body-table" basic="very">
			<Table.Header className="shopping-cart-section-body-table-header">
				<Table.Row>
					<Table.HeaderCell>Product</Table.HeaderCell>
					<Table.HeaderCell>Quantity</Table.HeaderCell>
					<Table.HeaderCell>Price</Table.HeaderCell>
					<Table.HeaderCell>Subtotal</Table.HeaderCell>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				<ItemCart />
			</Table.Body>
		</Table>
	);
}
