import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Embed } from 'semantic-ui-react';
import { frontloadConnect } from '../../hocs/frontLoad';

import MarketActions from '../../store/market/actions';
import ProfileActions from '../../store/profile/actions';
import Page from '../../components/page';
import './about.scss';

const { getCart } = MarketActions;
const { signin, signup } = ProfileActions;

const frontload = async props => await props.getCart();
class About extends PureComponent {
	componentDidMount = () => {};

	handleSubmit = e => {
		const formData = new FormData(e.target);
		const data = {};

		e.preventDefault();

		/* eslint-disable-next-line */
		for (const entry of formData.entries()) {
			data[entry[0]] = entry[1];
		}
		this.props.signup(data);
	};

	render() {
		const { totalPrice, totalQty } = this.props.cart;

		return (
			<Page
				id="about"
				title="About"
				description="This is about really cool stuff."
			>
				Total : {totalPrice}
				Total qty : {totalQty}
				<form onSubmit={this.handleSubmit}>
					<input type="text" name="email" placeholder="email" />
					<input type="text" name="address" placeholder="address" />
					<input type="text" name="phone" placeholder="phone" />
					<input type="text" name="name" placeholder="name" />
					<input
						type="password"
						name="password"
						placeholder="password"
					/>
					<button type="submit">Send</button>
				</form>
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
	cart: state.market.cart,
});

const mapDispatchToProps = dispatch =>
	bindActionCreators({ getCart, signin, signup }, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(
	frontloadConnect(frontload, {
		onMount: true,
		onUpdate: false,
	})(About)
);
