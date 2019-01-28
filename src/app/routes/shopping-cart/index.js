import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Container } from 'semantic-ui-react';
import queryString from 'query-string';
import MarketActions from '../../store/market/actions';
import Page from '../../components/page';

import CartEmpty from './components/CartEmpty';
import Cart from './components/Cart';
import Checkout from './components/Checkout';

import { setQuery } from '../../utils';

import './styles/index.scss';

const {
	addToCartProduct,
	reduceCartProduct,
	removeCartProduct,
	addOrder,
} = MarketActions;

class ShoppingCart extends Component {
	state = {
		queryPage: queryString.parse(this.props.location.search).cartpage,
	};

	componentDidUpdate() {
		if (
			this.state.queryPage !==
			queryString.parse(this.props.location.search).cartpage
		) {
			this.setState({
				queryPage: queryString.parse(this.props.location.search)
					.cartpage,
			});
		}
	}

	switchPage = querys => {
		setQuery(querys, this.props.history);
	};

	render() {
		const {
			loadingCart,
			cart,
			user,
			addToCart,
			reduceProduct,
			removeProduct,
		} = this.props;
		const { totalQty } = cart;
		const { queryPage } = this.state;
		return (
			<Page id="shopping-cart" title="My shopping cart">
				{totalQty ? (
					<Container>
						{queryPage === 'checkout' ? (
							<Checkout
								cart={cart}
								user={user}
								switchPage={this.switchPage}
								addOrder={this.props.addOrder}
								{...this.props}
							/>
						) : (
							<Cart
								addToCart={addToCart}
								reduceProduct={reduceProduct}
								removeProduct={removeProduct}
								switchPage={this.switchPage}
								loading={loadingCart}
								cart={cart}
							/>
						)}
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
	user: state.profile.profile,
	loadingCart: state.market.loadingCart,
});

const mapDispatchToProps = dispatch =>
	bindActionCreators(
		{
			addToCart: addToCartProduct,
			reduceProduct: reduceCartProduct,
			removeProduct: removeCartProduct,
			addOrder,
		},
		dispatch
	);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ShoppingCart);
