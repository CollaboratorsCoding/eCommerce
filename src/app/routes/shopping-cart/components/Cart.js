import React from 'react';
import { Icon, Grid, Button, Segment, Loader } from 'semantic-ui-react';

import ItemCart from './ItemCart';

export default function Cart({
	cart,
	addToCart,
	reduceProduct,
	removeProduct,
	switchPage,
	loading,
}) {
	const { totalPrice, productsInCart } = cart;
	return (
		<Segment
			className={`shopping-cart-section ${
				loading ? 'loading-segment' : ''
			}`}
		>
			<Loader active={loading} />
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
						<ItemCart
							products={productsInCart}
							handleAddProduct={addToCart}
							handleRemoveProduct={removeProduct}
							handleReduceProduct={reduceProduct}
						/>
					</Grid.Column>
				</Grid.Row>
				<Grid.Row>
					<Grid.Column>
						<div className="shopping-cart-section-footer">
							<div>
								<Button
									onClick={() =>
										switchPage({
											cartpage: 'checkout',
											step: 1,
										})
									}
									color="teal"
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
		</Segment>
	);
}
