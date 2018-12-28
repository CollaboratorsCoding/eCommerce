import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { frontloadConnect } from '../../hocs/frontLoad';
import MarketActions from '../../store/market/actions';
import ProductsList from '../../components/products-list';
import Page from '../../components/page';

const { getProducts } = MarketActions;

const frontload = async props =>
	await props.getProducts(props.match.params.slug_category);
export class Category extends Component {
	componentDidMount = () => {
		console.log('COMPONENT', this.props.products);
	};

	render() {
		const categoryName = this.props.match.params.slug_category;
		return (
			<Page id="category" title={categoryName} description={categoryName}>
				<div>
					{categoryName} Category
					<ProductsList products={this.props.products} />
				</div>
			</Page>
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
