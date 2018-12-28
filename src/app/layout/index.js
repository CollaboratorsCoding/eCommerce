import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Container } from 'semantic-ui-react';
import Loading from 'react-loading-bar';
import Header from './header';
import Footer from './footer';
import LoaderContext from '../context';

import { frontloadConnect } from '../hocs/frontLoad';
import MarketActions from '../store/market/actions';

const { getCart } = MarketActions;

const frontload = async props => await props.getCart();

class StickyLayout extends Component {
	state = {
		load: false,
	};

	setLoader = loading => {
		this.setState({ load: loading });
	};

	render() {
		return (
			<div>
				<Loading
					show={this.state.load}
					color="black"
					showSpinner={false}
				/>
				<LoaderContext.Provider value={this.setLoader}>
					<Header
						totalQty={this.props.cart.totalQty}
						current={this.props.current}
					/>
					<Container fluid>{this.props.children}</Container>
					<Footer />
				</LoaderContext.Provider>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	cart: state.market.cart,
	router: state.router,
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
