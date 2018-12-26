import React, { Component } from 'react';
import { bindActionCreators } from 'redux';

import { connect } from 'react-redux';
import { frontloadConnect } from '../../hocs/frontLoad';
import MarketActions from '../../store/market/actions';

const { getProduct } = MarketActions;

const frontload = async props =>
	await props.getProduct(props.match.params.slug_product);
export class Category extends Component {
	componentDidMount = () => {
		console.log('COMPONENT', this.props.product);
	};

	render() {
		const { product } = this.props;
		if (!product) return null;
		const { description, imagePath, price, title } = product;
		return (
			<div>
				<h1>{title}</h1>
				<div>Price: {price}</div>
				<img src={imagePath} alt={title} />
				<div>{description}</div>
			</div>
		);
	}
}
const mapStateToProps = state => ({
	product: state.market.product,
});

const mapDispatchToProps = dispatch =>
	bindActionCreators({ getProduct }, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(
	frontloadConnect(frontload, {
		onMount: true,
		onUpdate: false,
	})(Category)
);
