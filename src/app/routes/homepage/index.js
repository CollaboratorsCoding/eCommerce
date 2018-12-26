import React, { Component } from 'react';
import { Image } from 'semantic-ui-react';
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
			// infinite: false,
			className: 'slider variable-width',
			dots: false,
			infinite: true,
			centerMode: true,
			slidesToShow: 1,
			slidesToScroll: 1,
			variableWidth: true,
			autoplay: true,
			autoplaySpeed: 4000,
			onInit: () => {
				this.setState({
					loaded: true,
				});
			},
		};

		return (
			<Page id="homepage">
				<div
					className="slider-wrapper"
					style={{
						opacity: this.state.loaded ? 1 : 0,
					}}
				>
					<Slider {...settings}>
						<div className="slider-item">
							<Image src={require('../../assets/1.jpg')} />
							<div className="slider-text">Top apple product</div>
						</div>
						<div className="slider-item">
							<Image src={require('../../assets/2.jpg')} />
							<div className="slider-text">Top apple product</div>
						</div>
						<div className="slider-item">
							<Image src={require('../../assets/4.jpg')} />
							<div className="slider-text">Top apple product</div>
						</div>
						<div className="slider-item">
							<Image src={require('../../assets/5.jpg')} />
							<div className="slider-text">Top apple product</div>
						</div>
					</Slider>
				</div>
				<CategoriesList categories={this.props.categories} />
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
