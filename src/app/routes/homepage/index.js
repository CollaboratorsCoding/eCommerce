import React, { Component } from 'react';
import { Image, Grid } from 'semantic-ui-react';
import Slider from 'react-slick';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { frontloadConnect } from '../../hocs/frontLoad';
import Page from '../../components/page';
import CategoriesList from '../../components/categories-list';
import MarketActions from '../../store/market/actions';

import './homepage.scss';

const { getCategories } = MarketActions;

const frontload = async props => await props.getCategories();
class HomePage extends Component {
	state = {
		loaded: false,
	};

	render() {
		const settings = {
			dots: false,
			infinite: true,

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
								width={3}
								style={{
									background: '#fff',
									padding: 0,
								}}
								className="column-shadow-block"
							>
								<CategoriesList
									categories={this.props.categories}
								/>
							</Grid.Column>
							<Grid.Column width={13}>{slider}</Grid.Column>
						</Grid.Row>
						<Grid.Row>
							<Grid.Column width={16}>
								<div>Recomended</div>
							</Grid.Column>
						</Grid.Row>
						<Grid.Row>
							<Grid.Column width={16}>
								<div>Promotions</div>
							</Grid.Column>
						</Grid.Row>
					</Grid>
				</div>
			</Page>
		);
	}
}
const mapStateToProps = state => ({
	categories: state.market.categories,
});

const mapDispatchToProps = dispatch =>
	bindActionCreators({ getCategories }, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(
	frontloadConnect(frontload, {
		onMount: true,
		onUpdate: false,
	})(HomePage)
);
