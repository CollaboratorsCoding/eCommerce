import React from 'react';
import { Table, Icon, Label } from 'semantic-ui-react';

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
				<Table.Row>
					<Table.Cell>Iphone x</Table.Cell>
					<Table.Cell>
						<Icon
							color="grey"
							size="large"
							name="caret square left"
						/>
						<Label
							className="shopping-cart-section-body-table-quantity"
							color="blue"
						>
							2
						</Label>
						<Icon
							color="grey"
							size="large"
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
				<Table.Row>
					<Table.Cell>Iphone x</Table.Cell>
					<Table.Cell>
						<Icon
							color="grey"
							size="large"
							name="caret square left"
						/>
						<Label
							className="shopping-cart-section-body-table-quantity"
							color="blue"
						>
							1
						</Label>
						<Icon
							color="grey"
							size="large"
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
			</Table.Body>
		</Table>
	);
}
