import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import queryString from 'query-string';
import { connect } from 'react-redux';
import {
	Button,
	Label,
	Menu,
	Tab,
	Breadcrumb,
	Dimmer,
	Loader,
} from 'semantic-ui-react';
import Page from '../../components/page';
import Reviews from '../../components/reviews';
import { frontloadConnect } from '../../hocs/frontLoad';
import MarketActions from '../../store/market/actions';
import { setQuery } from '../../utils';

import { Homepage, Category } from '../index';
import CustomLink from '../../hocs/customLink';

const {
	getProduct,
	addToCartProduct,
	addReview,
	addReply,
	getReviews,
} = MarketActions;

const frontload = async props =>
	await props.getProduct(props.match.params.slug_product);

export class Product extends Component {
	handleTabChange = queryName => {
		setQuery('tab', queryName, this.props.history);
	};

	render() {
		const { product, addToCart, location, match, loading } = this.props;
		if (!product) return null;

		if (loading)
			return (
				<Dimmer inverted active>
					{' '}
					<Loader active />
				</Dimmer>
			);
		const {
			description,
			imagePath,
			price,
			title,
			reviewsCount,
			category,
		} = product;

		const query = queryString.parse(location.search);

		const panes = [
			{
				queryTab: 'description',
				menuItem: <Menu.Item key="description">Description</Menu.Item>,
				render: () => <Tab.Pane>{description}</Tab.Pane>,
			},
			{
				queryTab: 'reviews',
				menuItem: (
					<Menu.Item key="reviews">
						Reviews<Label>{reviewsCount}</Label>
					</Menu.Item>
				),
				render: () => (
					<Tab.Pane>
						<Reviews
							query={query}
							product={product}
							productSlug={match.params.slug_product}
							onGetReviews={this.props.getReviews}
							onAddReview={this.props.addReview}
							onAddReply={this.props.addReply}
						/>
					</Tab.Pane>
				),
			},
			{
				queryTab: 'test',
				menuItem: <Menu.Item key="test">Test</Menu.Item>,
				render: () => (
					<Tab.Pane active>
						<div>Rofel</div>
					</Tab.Pane>
				),
			},
		];

		const activeTabIndex = panes.findIndex(
			tab => tab.queryTab === query.tab
		);
		return (
			<Page
				id="product"
				title={title}
				description={description}
				image={imagePath}
			>
				<div>
					<Breadcrumb size="large">
						<Breadcrumb.Section link>
							{' '}
							<CustomLink componentPromise={Homepage} to="/">
								Home
							</CustomLink>
						</Breadcrumb.Section>
						<Breadcrumb.Divider icon="right chevron" />
						<Breadcrumb.Section>
							<CustomLink
								componentPromise={Category}
								to={`/c/${category}`}
							>
								{category}
							</CustomLink>
						</Breadcrumb.Section>
						<Breadcrumb.Divider icon="right chevron" />
						<Breadcrumb.Section active>{title}</Breadcrumb.Section>
					</Breadcrumb>
					<h1>{title}</h1>
					<div>Price: {price}</div>
					<Button
						onClick={() => {
							addToCart(product._id);
						}}
						basic
						color="green"
					>
						Add to Cart
					</Button>
					<img src={imagePath} alt={title} />
					<Tab
						panes={panes}
						defaultActiveIndex={activeTabIndex}
						onTabChange={(e, { activeIndex }) =>
							this.handleTabChange(panes[activeIndex].queryTab)
						}
					/>
				</div>
			</Page>
		);
	}
}
const mapStateToProps = state => ({
	product: state.market.product,
	loading: state.market.loading,
});

const mapDispatchToProps = dispatch =>
	bindActionCreators(
		{
			getProduct,
			addToCart: addToCartProduct,
			addReview,
			getReviews,
			addReply,
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
	})(Product)
);
