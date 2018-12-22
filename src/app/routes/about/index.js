import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Embed } from 'semantic-ui-react';
import { frontloadConnect } from '../../hocs/frontLoad';

import CartActions from '../../store/cart/actions';
import Page from '../../components/page';
import './about.scss';

const { getCart } = CartActions;

const frontload = async props => await props.getCart();
class About extends PureComponent {
	componentDidMount = () => {};

	render() {
		const { totalPrice, totalQty } = this.props.cart;
		console.log(this.props);
		return (
			<Page
				id="about"
				title="About"
				description="This is about really cool stuff."
			>
				Total : {totalPrice}
				Total qty : {totalQty}
				<Embed
					id="WWaLxFIVX1s"
					placeholder="https://lumiere-a.akamaihd.net/v1/images/Darth-Vader_6bda9114.jpeg?region=0%2C23%2C1400%2C785&width=960"
					source="youtube"
				/>
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
