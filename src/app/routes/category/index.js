import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import queryString from 'query-string';
import {
	Icon,
	Pagination,
	Grid,
	Segment,
	Button,
	Loader,
	Dimmer,
	Popup,
	Breadcrumb,
} from 'semantic-ui-react';
import _ from 'lodash';
import { setQuery } from '../../utils';
import { frontloadConnect } from '../../hocs/frontLoad';
import MarketActions from '../../store/market/actions';
import ProductsList from '../../components/products-list';
import FiltersList from '../../components/filters';
import Page from '../../components/page';
import CustomLink from '../../hocs/customLink';
import { Homepage } from '../index';
import CategoriesList from '../../components/categories-list';

import './category.scss';

const { getProducts, addToCartProduct, getCategories } = MarketActions;

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

	if (!_.size(props.categories) || _.size(props.categories) === 1) {
		await props.handleGetCategories();
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
		const prevCategoryName = prevProps.match.params.slug_category;
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
			setQuery({ p: 1 }, this.props.history);
			this.setState({
				activePage: 1,
			});
		}

		if (
			categoryName !== prevCategoryName &&
			!_.get(
				this.props,
				`categories[${categoryName}].products[${prevState.activePage ||
					'1'}].length`
			)
		) {
			this.setState({
				activePage: 1,
			});
			this.props.getProducts(null, null, categoryName);
		}
	};

	handlePaginationChange = (e, { activePage }) => {
		const categoryName = this.props.match.params.slug_category;

		setQuery({ p: activePage }, this.props.history);
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
		setQuery({ price: filterQuery.split('=')[1] }, this.props.history);
		this.props.getProducts(
			activePage,
			20,
			this.props.match.params.slug_category,
			filterQuery
		);
	};

	countPages = items => Math.ceil(items / 20);

	render() {
		const categorySlug = this.props.match.params.slug_category;

		const { categories, addToCart, loading, loadingCart } = this.props;
		const { activePage } = this.state;
		const categoryName = _.get(categories[categorySlug], 'title', '');

		if (loading)
			return (
				<Dimmer inverted active>
					{' '}
					<Loader active />
				</Dimmer>
			);
		const upperRow = (
			<Grid.Row verticalAlign="middle" textAlign="center">
				<Grid.Column mobile={16} tablet={7} computer={3}>
					<Popup
						trigger={<Button icon>Categories</Button>}
						flowing
						hoverable
						position="bottom center"
					>
						<CategoriesList className="hover-categories" />
					</Popup>
				</Grid.Column>
				<Grid.Column
					mobile={16}
					tablet={9}
					computer={13}
					className="category-label-wrapper"
				>
					<div className="category-label">{categoryName}</div>
				</Grid.Column>
				<Breadcrumb size="large">
					<Breadcrumb.Section>
						<CustomLink
							style={{ cursor: 'pointer' }}
							componentPromise={Homepage}
							to="/"
						>
							Home
						</CustomLink>
					</Breadcrumb.Section>
					<Breadcrumb.Divider icon="right chevron" />
					<Breadcrumb.Section active>
						{categoryName}
					</Breadcrumb.Section>
				</Breadcrumb>
			</Grid.Row>
		);
		if (
			!_.get(
				this.props,
				`categories[${categorySlug}].products[${activePage}].length`,
				null
			)
		) {
			return (
				<Grid>
					{upperRow}
					<Grid.Row>Not Found</Grid.Row>
				</Grid>
			);
		}

		const currentCategory = categories[categorySlug];

		return (
			<Page id="category" title={categoryName} description={categoryName}>
				<Grid>
					{upperRow}
					<Grid.Row>
						<Grid.Column
							mobile={16}
							tablet={7}
							computer={3}
							style={{
								background: '#fff',
								boxShadow: '0 1px 2px 0 rgba(34,36,38,.15)',
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

						<Grid.Column mobile={16} tablet={9} computer={13}>
							<Segment
								className={
									loading
										? 'products-section loading-segment'
										: 'products-section'
								}
							>
								<Loader active={loading} />
								<ProductsList
									loadingCart={loadingCart}
									addToCart={addToCart}
									products={
										currentCategory.products[activePage]
									}
								/>

								<Pagination
									activePage={activePage}
									boundaryRange={1}
									className="products-pagination"
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
	loading: state.market.loading,
	loadingCart: state.market.loadingCart,
});

const mapDispatchToProps = dispatch =>
	bindActionCreators(
		{
			getProducts,
			addToCart: addToCartProduct,
			handleGetCategories: getCategories,
		},
		dispatch
	);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(
	frontloadConnect(frontload, {
		onMount: true,
		onUpdate: false,
	})(Category)
);
