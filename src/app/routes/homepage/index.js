import React, { Component } from 'react';
import { Image, Grid } from 'semantic-ui-react';
import Slider from 'react-slick';
import { bindActionCreators } from 'redux';

import { connect } from 'react-redux';
import MarketActions from '../../store/market/actions';

import Page from '../../components/page';
import CategoriesList from '../../components/categories-list';
import ProductsCarousel from '../../components/products-carousel';

import './homepage.scss';

const { addToCartProduct } = MarketActions;
class HomePage extends Component {
	state = {
		loaded: false,
	};

	render() {
		const { lastVisitedProducts, addToCart, loadingCart } = this.props;
		const settings = {
			dots: false,
			infinite: true,
			arrows: false,
			slidesToShow: 1,
			slidesToScroll: 1,

			adaptiveHeight: true,
			autoplay: true,
			autoplaySpeed: 4000,
			onInit: () => {
				this.setState({
					loaded: true,
				});
			},
		};
		const slider = (
			<Slider {...settings}>
				<div className="slider-item">
					<Image src={require('../../assets/1.jpg')} />
					<div className="slider-text">Welcome</div>
				</div>
				<div className="slider-item">
					<Image src={require('../../assets/3.jpg')} />
					<div className="slider-text">Hot Holidays Discounts</div>
				</div>
				<div className="slider-item">
					<Image src={require('../../assets/2.jpg')} />
					<div className="slider-text">Newbalance Trends</div>
				</div>
				<div className="slider-item">
					<Image src={require('../../assets/4.jpg')} />
					<div className="slider-text">Chose your tag</div>
				</div>
				<div className="slider-item">
					<Image src={require('../../assets/5.jpg')} />
					<div className="slider-text">And more...</div>
				</div>
			</Slider>
		);
		return (
			<Page id="homepage">
				<div
					className="slider-wrapper"
					style={{
						opacity: this.state.loaded ? 1 : 0,
					}}
				>
					<Grid>
						<Grid.Row>
							<Grid.Column
								mobile={16}
								tablet={8}
								computer={5}
								style={{
									background: '#fff',
									padding: 0,
								}}
								className="column-shadow-block"
							>
								<CategoriesList />
							</Grid.Column>
							<Grid.Column mobile={16} tablet={8} computer={11}>
								{slider}
							</Grid.Column>
						</Grid.Row>
						<Grid.Row>
							<h1 className="section-header">
								Last Visited Products
							</h1>
							<Grid.Column width={16}>
								<ProductsCarousel
									products={lastVisitedProducts}
									addToCart={addToCart}
									loadingCart={loadingCart}
								/>
							</Grid.Column>
						</Grid.Row>
					</Grid>
				</div>
			</Page>
		);
	}
}

const mapStateToProps = state => ({
	lastVisitedProducts: state.profile.lastVisitedProducts,
	loadingCart: state.market.loadingCart,
});

const mapDispatchToProps = dispatch =>
	bindActionCreators(
		{
			addToCart: addToCartProduct,
		},
		dispatch
	);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(HomePage);
