import React from 'react';
import { Button, Icon, Label, Grid, Image, Segment } from 'semantic-ui-react';
import Page from '../../components/page';

import logo from '../../assets/iphone-xs-silver-select-2018_AV3.jpg';

export default () => (
	<Page id="homepage">
		<p>Here our homepage. All are welcome. </p>
		<div>
			<Button as="div" labelPosition="right">
				<Button color="red">
					<Icon name="heart" />
					Likes
				</Button>
				<Label as="a" basic color="red" pointing="left">
					2,048
				</Label>
			</Button>
			<Button as="div" labelPosition="right">
				<Button basic color="blue">
					<Icon name="fork" />
					Fork
				</Button>
				<Label as="a" basic color="blue" pointing="left">
					2,048
				</Label>
			</Button>
		</div>

		<img src={logo} alt="Homepage" style={{ width: '400px' }} />
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
