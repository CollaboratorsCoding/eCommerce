import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Grid, Icon, Button } from 'semantic-ui-react';
import { frontloadConnect } from '../../hocs/frontLoad';

import CartActions from '../../store/cart/actions';
import Page from '../../components/page';

import CartBody from './components/CartBody';

import './styles/index.scss';

const { getCart } = CartActions;

const frontload = async props => await props.getCart();
class About extends PureComponent {
	state = {};

	render() {
		// const { totalPrice, totalQty } = this.props.cart;

		return (
			<Page id="shopping-cart" title="My shopping cart">
				<section className="shopping-cart-section">
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
								<CartBody />
							</Grid.Column>
						</Grid.Row>
						<Grid.Row className="shopping-cart-section-footer">
							<Grid.Column>
								<h2 style={{ textAlign: 'right' }}>
									Total: $230
								</h2>
							</Grid.Column>
						</Grid.Row>
					</Grid>
				</section>
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
