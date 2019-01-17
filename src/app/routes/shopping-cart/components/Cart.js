import React from 'react';
import { Icon, Table, Grid, Button } from 'semantic-ui-react';

import ItemCart from './ItemCart';

export default function Cart({
	history,
	cart,
	addToCart,
	reduceProduct,
	removeProduct,
	switchPage,
}) {
	const { totalPrice, productsInCart } = cart;
	return (
		<div className="shopping-cart-section">
			<Grid>
				<Grid.Row className="shopping-cart-section-header">
					<Grid.Column>
						<h3>
							<Icon name="shopping cart" />
							My shopping cart
						</h3>
					</Grid.Column>
				</Grid.Row>
				<Grid.Row className="shopping-cart-section-body">
					<Grid.Column>
						<Table
							className="shopping-cart-section-body-table"
							basic="very"
						>
							<Table.Header className="shopping-cart-section-body-table-header">
								<Table.Row>
									<Table.HeaderCell />
									<Table.HeaderCell>Product</Table.HeaderCell>
									<Table.HeaderCell>
										Quantity
									</Table.HeaderCell>
									<Table.HeaderCell>Price</Table.HeaderCell>
									<Table.HeaderCell>
										Subtotal
									</Table.HeaderCell>
								</Table.Row>
							</Table.Header>
							<Table.Body>
								{productsInCart.map(product => (
									<ItemCart
										key={product.item._id}
										product={product}
										handleAddProduct={addToCart}
										handleRemoveProduct={removeProduct}
										handleReduceProduct={reduceProduct}
									/>
								))}
							</Table.Body>
						</Table>
					</Grid.Column>
				</Grid.Row>
				<Grid.Row>
					<Grid.Column>
						<div className="shopping-cart-section-footer">
							<div>
								<Button
									color="teal"
									onClick={() => history.goBack()}
								>
									<Icon name="arrow left" /> COUNTINUE
									SHOPPING
								</Button>
								<Button
									onClick={() =>
										switchPage({
											cartpage: 'checkout',
											step: 1,
										})
									}
									primary
								>
									CHECKOUT
								</Button>
							</div>
							<h2>
								TOTAL: <Icon name="usd" />
								{totalPrice}
							</h2>
						</div>
					</Grid.Column>
				</Grid.Row>
			</Grid>
		</div>
	);
}
