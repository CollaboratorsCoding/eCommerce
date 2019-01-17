import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Container } from 'semantic-ui-react';
import Loading from '../components/loader';
import Header from './header';
import Footer from './footer';
import LoaderContext from '../context';

import { frontloadConnect } from '../hocs/frontLoad';
import MarketActions from '../store/market/actions';
import ProfileActions from '../store/profile/actions';

const { getCart } = MarketActions;
const { getProfile, logout } = ProfileActions;

const frontload = async props => {
	await props.getCart();
	await props.getProfile();
};

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
				<Loading show={this.state.load} color="black" />
				<LoaderContext.Provider value={this.setLoader}>
					<Header
						user={this.props.user}
						logout={this.props.logout}
						totalQty={this.props.cart.totalQty}
						current={this.props.current}
					/>
					<Container fluid className="main-container">
						{this.props.children}
					</Container>
					<Footer />
				</LoaderContext.Provider>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	cart: state.market.cart,
	user: state.profile,
});

const mapDispatchToProps = dispatch =>
	bindActionCreators({ getCart, getProfile, logout }, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(
	frontloadConnect(frontload, {
		onMount: true,
		onUpdate: false,
	})(StickyLayout)
);
