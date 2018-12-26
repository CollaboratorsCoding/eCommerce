import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { frontloadConnect } from '../../hocs/frontLoad';
import MarketActions from '../../store/market/actions';
import ProductsList from '../../components/products-list';

const { getProducts } = MarketActions;

const frontload = async props =>
	await props.getProducts(props.match.params.slug_category);
export class Category extends Component {
	componentDidMount = () => {
		console.log('COMPONENT', this.props.products);
	};

	render() {
		return (
			<div>
				{this.props.match.params.slug_category} Category
				<ProductsList products={this.props.products} />
			</div>
		);
	}
}
const mapStateToProps = state => ({
	products: state.market.products,
});

const mapDispatchToProps = dispatch =>
	bindActionCreators({ getProducts }, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(
	frontloadConnect(frontload, {
		onMount: true,
		onUpdate: false,
	})(Category)
);
