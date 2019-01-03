import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import queryString from 'query-string';
import { Icon, Pagination } from 'semantic-ui-react';
import _ from 'lodash';
import { setQuery } from '../../utils';
import { frontloadConnect } from '../../hocs/frontLoad';
import MarketActions from '../../store/market/actions';
import ProductsList from '../../components/products-list';
import Page from '../../components/page';

const { getProducts } = MarketActions;

const frontload = async props => {
	const query = queryString.parse(props.location.search);
	const categoryName = props.match.params.slug_category;
	const { p, l } = query;
	// if (!_.get(props, `product.reviews[${p || '1'}].length`)) {
	// 	await props.onGetReviews(p, l, props.product._id);
	// }

	await props.getProducts(p, l, categoryName);
};
export class Category extends Component {
	constructor(props) {
		const query = queryString.parse(props.location.search);
		super(props);
		this.state = {
			activePage: query.p || 1,
		};
	}

	handlePaginationChange = (e, { activePage }) => {
		const categoryName = this.props.match.params.slug_category;

		setQuery('p', activePage, this.props.history);
		this.setState({ activePage });
		if (
			!_.get(
				this.props,
				`categories[${categoryName}].products[${activePage}].length`,
				null
			)
		) {
			this.props.getProducts(
				activePage,
				20,
				this.props.match.params.slug_category
			);
		}
	};

	countPages = items => Math.ceil(items / 20);

	render() {
		const categoryName = this.props.match.params.slug_category;
		const { categories } = this.props;
		const { activePage } = this.state;

		if (
			!_.get(
				this.props,
				`categories[${categoryName}].products[${activePage}].length`,
				null
			)
		) {
			return 'Loading';
		}
		const currentCategory = categories[categoryName];

		return (
			<Page id="category" title={categoryName} description={categoryName}>
				<div>
					{categoryName} Category
					<ProductsList
						products={currentCategory.products[activePage]}
					/>
					<Pagination
						activePage={activePage}
						boundaryRange={1}
						onPageChange={this.handlePaginationChange}
						ellipsisItem={{
							content: <Icon name="ellipsis horizontal" />,
							icon: true,
						}}
						firstItem={{
							content: <Icon name="angle double left" />,
							icon: true,
						}}
						lastItem={{
							content: <Icon name="angle double right" />,
							icon: true,
						}}
						prevItem={{
							content: <Icon name="angle left" />,
							icon: true,
						}}
						nextItem={{
							content: <Icon name="angle right" />,
							icon: true,
						}}
						totalPages={this.countPages(
							currentCategory.productsCount
						)}
					/>
				</div>
			</Page>
		);
	}
}
const mapStateToProps = state => ({
	categories: state.market.categories,
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
