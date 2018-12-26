import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Table, Grid, Icon, Button, Container } from 'semantic-ui-react';
import { frontloadConnect } from '../../hocs/frontLoad';

import CartActions from '../../store/cart/actions';
import Page from '../../components/page';

import ItemCart from './components/ItemCart';

import './styles/index.scss';

const { getCart } = CartActions;

const frontload = async props => await props.getCart();
class About extends PureComponent {
	state = {};

	render() {
		// const { totalPrice, totalQty } = this.props.cart;

		return (
			<Page id="shopping-cart" title="My shopping cart">
				<Container className="shopping-cart-section">
					<Grid>
						<Grid.Row className="shopping-cart-section-header">
							<Grid.Column>
								<h3>
									<Icon color="white" name="shopping cart" />
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
										<ItemCart />
									</Table.Body>
								</Table>
							</Grid.Column>
						</Grid.Row>
						<Grid.Row>
							<Grid.Column>
								<div className="shopping-cart-section-footer">
									<div>
										<Button color="teal">
											<Icon name="arrow left" /> COUNTINUE
											SHOPPING
										</Button>
										<Button primary>CHECKOUT</Button>
									</div>
									<h2>Total: $230</h2>
								</div>
							</Grid.Column>
						</Grid.Row>
					</Grid>
				</Container>
			</Page>
		);
	}
}

const mapStateToProps = state => ({
	cart: state.cart.cart,
	rout: state,
});

const mapDispatchToProps = dispatch =>
	bindActionCreators({ getCart }, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(
	frontloadConnect(frontload, {
		onMount: true,
		onUpdate: false,
	})(About)
);
