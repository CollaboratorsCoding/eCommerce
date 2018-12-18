import React from 'react';
import { Grid, Image, Segment } from 'semantic-ui-react';
import Slider from 'react-slick';
import Page from '../../components/page';

import './homepage.scss';

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
};
export default () => (
	<Page id="homepage">
		<div>
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

		<Grid stackable columns={2}>
			<Grid.Column>
				<Segment>
					<Image src="https://react.semantic-ui.com/images/wireframe/paragraph.png" />
				</Segment>
			</Grid.Column>
			<Grid.Column>
				<Segment>
					<Image src="https://react.semantic-ui.com/images/wireframe/paragraph.png" />
				</Segment>
			</Grid.Column>
			<Grid.Column>
				<Segment>
					<Image src="https://react.semantic-ui.com/images/wireframe/paragraph.png" />
				</Segment>
			</Grid.Column>
			<Grid.Column>
				<Segment>
					<Image src="https://react.semantic-ui.com/images/wireframe/paragraph.png" />
				</Segment>
			</Grid.Column>
			<Grid.Column>
				<Segment>
					<Image src="https://react.semantic-ui.com/images/wireframe/paragraph.png" />
				</Segment>
			</Grid.Column>
			<Grid.Column>
				<Segment>
					<Image src="https://react.semantic-ui.com/images/wireframe/paragraph.png" />
				</Segment>
			</Grid.Column>
			<Grid.Column>
				<Segment>
					<Image src="https://react.semantic-ui.com/images/wireframe/paragraph.png" />
				</Segment>
			</Grid.Column>
		</Grid>
	</Page>
);
