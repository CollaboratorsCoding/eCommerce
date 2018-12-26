import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Table, Grid, Icon, Button, Container } from 'semantic-ui-react';

import MarketActions from '../../store/market/actions';
import Page from '../../components/page';

import ItemCart from './components/ItemCart';
import CartEmpty from './components/CartEmpty';

import './styles/index.scss';

const {
	addToCartProduct,
	reduceCartProduct,
	removeCartProduct,
} = MarketActions;

class ShoppingCart extends PureComponent {
	state = {};

	render() {
		const { cart, addToCart, reduceProduct, removeProduct } = this.props;

		const { totalPrice, totalQty, productsInCart } = cart;

		return (
			<Page id="shopping-cart" title="My shopping cart">
				{totalQty ? (
					<Container className="shopping-cart-section">
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
												<Table.HeaderCell>
													Product
												</Table.HeaderCell>
												<Table.HeaderCell>
													Quantity
												</Table.HeaderCell>
												<Table.HeaderCell>
													Price
												</Table.HeaderCell>
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
													handleRemoveProduct={
														removeProduct
													}
													handleReduceProduct={
														reduceProduct
													}
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
											<Button color="teal">
												<Icon name="arrow left" />{' '}
												COUNTINUE SHOPPING
											</Button>
											<Button primary>CHECKOUT</Button>
										</div>
										<h2>
											TOTAL: <Icon name="usd" />
											{totalPrice}
										</h2>
									</div>
								</Grid.Column>
							</Grid.Row>
						</Grid>
					</Container>
				) : (
					<CartEmpty />
				)}
			</Page>
		);
	}
}

const mapStateToProps = state => ({
	cart: state.market.cart,
});

const mapDispatchToProps = dispatch =>
	bindActionCreators(
		{
			addToCart: addToCartProduct,
			reduceProduct: reduceCartProduct,
			removeProduct: removeCartProduct,
		},
		dispatch
	);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ShoppingCart);
