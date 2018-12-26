import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Container } from 'semantic-ui-react';
import Header from './header';
import Footer from './footer';

import { frontloadConnect } from '../hocs/frontLoad';
import MarketActions from '../store/market/actions';

const { getCart } = MarketActions;

const frontload = async props => await props.getCart();

class StickyLayout extends Component {
	state = {};

	render() {
		return (
			<div>
				<Header
					totalQty={this.props.cart.totalQty}
					current={this.props.current}
				/>
				<Container fluid>{this.props.children}</Container>
				<Footer />
			</div>
		);
	}
}

const mapStateToProps = state => ({
	cart: state.market.cart,
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
	})(StickyLayout)
);
