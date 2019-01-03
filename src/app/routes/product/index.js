import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import queryString from 'query-string';
import { connect } from 'react-redux';
import { Button, Label, Menu, Tab } from 'semantic-ui-react';
import Page from '../../components/page';
import Reviews from '../../components/reviews';
import { frontloadConnect } from '../../hocs/frontLoad';
import MarketActions from '../../store/market/actions';
import { setQuery } from '../../utils';

const { getProduct, addToCartProduct, addReview, getReviews } = MarketActions;

const frontload = async props =>
	await props.getProduct(props.match.params.slug_product);

export class Category extends Component {
	handleTabChange = queryName => {
		setQuery('tab', queryName, this.props.history);
	};

	render() {
		const { product, addToCart, location } = this.props;

		if (!product) return null;

		const { description, imagePath, price, title, reviewsCount } = product;

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
							onGetReviews={this.props.getReviews}
							onAddReview={this.props.addReview}
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
});

const mapDispatchToProps = dispatch =>
	bindActionCreators(
		{ getProduct, addToCart: addToCartProduct, addReview, getReviews },
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
