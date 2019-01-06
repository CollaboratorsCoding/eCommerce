import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import queryString from 'query-string';
import { Icon, Pagination, Grid, Segment, Button } from 'semantic-ui-react';
import _ from 'lodash';
import { setQuery } from '../../utils';
import { frontloadConnect } from '../../hocs/frontLoad';
import MarketActions from '../../store/market/actions';
import ProductsList from '../../components/products-list';
import FiltersList from '../../components/filters';
import Page from '../../components/page';

// import CategoriesList from '../../components/categories-list';

import './category.scss';

const { getProducts, addToCartProduct } = MarketActions;

const frontload = async props => {
	const query = queryString.parse(props.location.search);
	const categoryName = props.match.params.slug_category;
	const { p, l, price } = query;
	if (
		!_.get(
			props,
			`categories[${categoryName}].products[${p || '1'}].length`
		)
	) {
		await props.getProducts(
			p,
			l,
			categoryName,
			price ? `price=${price}` : ''
		);
	}
};
export class Category extends Component {
	constructor(props) {
		const query = queryString.parse(props.location.search);
		super(props);
		this.state = {
			activePage: query.p || 1,
		};
	}

	componentDidUpdate = (prevProps, prevState) => {
		const categoryName = this.props.match.params.slug_category;
		if (
			!_.get(
				this.props,
				`categories[${categoryName}].products[${
					prevState.activePage
				}].length`,
				null
			) &&
			prevState.activePage !== 1
		) {
			setQuery('p', '1', this.props.history);
			this.setState({
				activePage: 1,
			});
		}
	};

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

	handleApplyFilters = filterQuery => {
		const { activePage } = this.state;
		setQuery('price', filterQuery.split('=')[1], this.props.history);
		this.props.getProducts(
			activePage,
			20,
			this.props.match.params.slug_category,
			filterQuery
		);
	};

	countPages = items => Math.ceil(items / 20);

	render() {
		const categoryName = this.props.match.params.slug_category;
		const { categories, addToCart } = this.props;
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
				<Grid>
					<Grid.Row>
						<Grid.Column width={3}>
							<Button>Categories</Button>
							{/* <CategoriesList categories={categories} /> */}
						</Grid.Column>
						<Grid.Column
							width={13}
							className="category-label-wrapper"
						>
							<div className="category-label">{categoryName}</div>
						</Grid.Column>
					</Grid.Row>
					<Grid.Row>
						<Grid.Column
							width={3}
							style={{
								background: '#fff',
								padding: 0,
							}}
						>
							<FiltersList
								handleApplyFilters={this.handleApplyFilters}
								filtersData={currentCategory.filtersData}
								filtersExisting={
									currentCategory.filtersExisting
								}
							/>
						</Grid.Column>

						<Grid.Column width={13}>
							<Segment>
								<ProductsList
									addToCart={addToCart}
									products={
										currentCategory.products[activePage]
									}
								/>

								<Pagination
									activePage={activePage}
									boundaryRange={1}
									onPageChange={this.handlePaginationChange}
									ellipsisItem={{
										content: (
											<Icon name="ellipsis horizontal" />
										),
										icon: true,
									}}
									firstItem={{
										content: (
											<Icon name="angle double left" />
										),
										icon: true,
									}}
									lastItem={{
										content: (
											<Icon name="angle double right" />
										),
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
										currentCategory.filteredDocsCount ||
											currentCategory.productsCount
									)}
								/>
							</Segment>
						</Grid.Column>
					</Grid.Row>
				</Grid>
			</Page>
		);
	}
}
const mapStateToProps = state => ({
	categories: state.market.categories,
});

const mapDispatchToProps = dispatch =>
	bindActionCreators({ getProducts, addToCart: addToCartProduct }, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(
	frontloadConnect(frontload, {
		onMount: true,
		onUpdate: false,
	})(Category)
);
