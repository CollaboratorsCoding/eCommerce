import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import queryString from 'query-string';
import { connect } from 'react-redux';
import _ from 'lodash';
import {
	Button,
	Label,
	Menu,
	Tab,
	Breadcrumb,
	Dimmer,
	Loader,
	Grid,
	Rating,
	Sticky,
} from 'semantic-ui-react';
import Page from '../../components/page';
import Reviews from '../../components/reviews';
import { frontloadConnect } from '../../hocs/frontLoad';
import MarketActions from '../../store/market/actions';
import { setQuery } from '../../utils';

import { Homepage, Category } from '../index';
import CustomLink from '../../hocs/customLink';
import './index.scss';

const {
	getProduct,
	addToCartProduct,
	addReview,
	addReply,
	getReviews,
	addReviewRate,
} = MarketActions;

const frontload = async props =>
	await props.getProduct(props.match.params.slug_product);

export class Product extends Component {
	state = {
		activeTab: queryString.parse(this.props.location.search).tab,
	};

	componentDidUpdate = (prevProps, prevState) => {
		const query = queryString.parse(this.props.location.search).tab;

		if (query !== prevState.activeTab) {
			this.setState({ activeTab: query });
		}
	};

	handleTabChange = queryName => {
		this.setState({ activeTab: queryName });
		setQuery({ tab: queryName }, this.props.history);
	};

	handleContextRef = contextRef => this.setState({ contextRef });

	render() {
		const { product, addToCart, location, match, loading } = this.props;
		const { contextRef } = this.state;
		if (!product || _.isEmpty(product)) return 'Not found';

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
				render: () => (
					<Tab.Pane>
						<Grid
							style={{
								background: '#fff',
								padding: '15px',
							}}
						>
							<Grid.Row>
								<Grid.Column
									mobile={16}
									tablet={8}
									computer={8}
								>
									<section className="left-product-section">
										<div className="product-img">
											<img alt="img" src={imagePath} />
										</div>
									</section>
								</Grid.Column>
								<Grid.Column
									mobile={16}
									tablet={8}
									computer={8}
								>
									<section className="right-product-section">
										<div className="right-wrapper">
											<div className="product-description">
												{description}
											</div>
											<div className="price-btn-wrapper">
												<div className="product-price">
													${price}
												</div>
												<Button
													onClick={() => {
														addToCart(product._id);
													}}
													color="teal"
													className="product-buy"
												>
													Add to Cart
												</Button>
											</div>
										</div>
									</section>
								</Grid.Column>
							</Grid.Row>
						</Grid>
					</Tab.Pane>
				),
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
						<Grid
							style={{
								background: '#fff',
								padding: '15px',
							}}
						>
							<Grid.Row>
								<Grid.Column
									mobile={16}
									tablet={8}
									computer={8}
								>
									<Reviews
										query={query}
										product={product}
										productSlug={match.params.slug_product}
										onGetReviews={this.props.getReviews}
										onAddReview={this.props.addReview}
										onAddReply={this.props.addReply}
										onHandleAddReviewRate={
											this.props.addReviewRate
										}
									/>
								</Grid.Column>
								<Grid.Column
									mobile={16}
									tablet={8}
									computer={8}
								>
									<div
										style={{ height: '100%' }}
										ref={this.handleContextRef}
									>
										<Sticky
											context={contextRef}
											offset={40}
										>
											<div className="product-img">
												<img
													alt="img"
													src={imagePath}
												/>
											</div>
											<div className="product-description">
												{description}
											</div>
											<div className="price-btn-wrapper">
												<div className="product-price">
													${price}
												</div>
												<Button
													onClick={() => {
														addToCart(product._id);
													}}
													color="teal"
													className="product-buy"
												>
													Add to Cart
												</Button>
											</div>
										</Sticky>
									</div>
								</Grid.Column>
							</Grid.Row>
						</Grid>
					</Tab.Pane>
				),
			},
		];

		const activeTabIndex = panes.findIndex(
			tab => tab.queryTab === this.state.activeTab
		);
		return (
			<Page
				id="product"
				title={title}
				description={description}
				image={imagePath}
			>
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
					<Breadcrumb.Section>
						<CustomLink
							style={{ cursor: 'pointer' }}
							componentPromise={Category}
							to={`/c/${category}`}
						>
							{_.get(
								this.props.categories[category],
								'title',
								category
							)}
						</CustomLink>
					</Breadcrumb.Section>
					<Breadcrumb.Divider icon="right chevron" />
					<Breadcrumb.Section active>{title}</Breadcrumb.Section>
				</Breadcrumb>
				<div>
					<h1>{title}</h1>
					<Rating
						icon="star"
						rating={
							product.rating ? product.rating / product.votes : 0
						}
						maxRating={5}
						disabled
						size="large"
					/>
					<Tab
						panes={panes}
						activeIndex={activeTabIndex}
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
	categories: state.market.categories,
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
			addReviewRate,
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
