import _ from 'lodash';
import React, { Component } from 'react';

import {
	Container,
	Divider,
	Dropdown,
	Grid,
	Header,
	Image,
	List,
	Menu,
	Segment,
	Visibility,
	Icon,
} from 'semantic-ui-react';
import CustomLink from './hocs/customLink';
import { Homepage, About } from './routes';

import logo from './assets/logo.png';

const links = [
	{
		to: '/',
		text: 'Homepage',
		componentPromise: Homepage,
	},
	{
		to: '/about',
		text: 'About',
		componentPromise: About,
	},
];

const isCurrent = (to, current) => {
	if (to === '/' && current === to) {
		return true;
	}
	if (to !== '/' && current.includes(to)) {
		return true;
	}

	return false;
};

const HeaderLink = ({ to, text, componentPromise, current }) => (
	<Menu.Item
		to={to}
		componentPromise={componentPromise}
		text={text}
		as={CustomLink}
		className={isCurrent(to, current) ? 'current' : ''}
	>
		{text}
	</Menu.Item>
);
const menuStyle = {
	border: 'none',
	borderRadius: 0,
	boxShadow: 'none',

	transition: 'box-shadow 0.5s ease, padding 0.5s ease',
};

const fixedMenuStyle = {
	backgroundColor: '#fff',
	border: '1px solid #ddd',
	boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.2)',
};

export default class StickyLayout extends Component {
	state = {
		menuFixed: false,
	};

	handleOverlayRef = c => {
		const { overlayRect } = this.state;

		if (!overlayRect) {
			this.setState({
				overlayRect: _.pick(
					c.getBoundingClientRect(),
					'height',
					'width'
				),
			});
		}
	};

	stickTopMenu = () => this.setState({ menuFixed: true });

	unStickTopMenu = () => this.setState({ menuFixed: false });

	render() {
		const { menuFixed } = this.state;
		const { current, children } = this.props;
		return (
			<div>
				{/* Heads up, style below isn't necessary for correct work of example, simply our docs defines other
            background color.
          */}
				<style>{`
          html, body {
            background: #fff;
          }
        `}</style>

				{/* Attaching the top menu is a simple operation, we only switch `fixed` prop and add another style if it has
            gone beyond the scope of visibility
          */}
				<Visibility
					onBottomPassed={this.stickTopMenu}
					onBottomVisible={this.unStickTopMenu}
					once={false}
				>
					<Menu
						borderless
						fixed={menuFixed ? 'top' : undefined}
						style={menuFixed ? fixedMenuStyle : menuStyle}
					>
						<Container>
							<Menu.Item>
								<Image size="mini" src={logo} />
							</Menu.Item>
							<Menu.Item header>JabkoStore</Menu.Item>
							{links.map(link => {
								const TheLink = (
									<HeaderLink
										key={link.text}
										current={current}
										{...link}
									/>
								);

								return TheLink;
							})}

							<Menu.Menu position="right">
								<Menu.Item>
									<Icon.Group size="big">
										<Icon name="shopping cart" />
										<Icon
											color="red"
											corner="top right"
											name="add"
										/>
									</Icon.Group>
								</Menu.Item>
								<Dropdown
									text="Profile"
									pointing
									className="link item"
								>
									<Dropdown.Menu>
										<Dropdown.Item>List Item</Dropdown.Item>
										<Dropdown.Item>List Item</Dropdown.Item>
										<Dropdown.Divider />
										<Dropdown.Header>
											Header Item
										</Dropdown.Header>
										<Dropdown.Item>
											<i className="dropdown icon" />
											<span className="text">
												Submenu
											</span>
											<Dropdown.Menu>
												<Dropdown.Item>
													List Item
												</Dropdown.Item>
												<Dropdown.Item>
													List Item
												</Dropdown.Item>
											</Dropdown.Menu>
										</Dropdown.Item>
										<Dropdown.Item>List Item</Dropdown.Item>
									</Dropdown.Menu>
								</Dropdown>
							</Menu.Menu>
						</Container>
					</Menu>
				</Visibility>

				<Container fluid>{children}</Container>

				<Segment
					inverted
					style={{ margin: '5em 0em 0em', padding: '5em 0em' }}
					vertical
				>
					<Container textAlign="center">
						<Grid columns={4} divided stackable inverted>
							<Grid.Row>
								<Grid.Column>
									<Header
										inverted
										as="h4"
										content="Group 1"
									/>
									<List link inverted>
										<List.Item as="a">Link One</List.Item>
										<List.Item as="a">Link Two</List.Item>
										<List.Item as="a">Link Three</List.Item>
										<List.Item as="a">Link Four</List.Item>
									</List>
								</Grid.Column>
								<Grid.Column>
									<Header
										inverted
										as="h4"
										content="Group 2"
									/>
									<List link inverted>
										<List.Item as="a">Link One</List.Item>
										<List.Item as="a">Link Two</List.Item>
										<List.Item as="a">Link Three</List.Item>
										<List.Item as="a">Link Four</List.Item>
									</List>
								</Grid.Column>
								<Grid.Column>
									<Header
										inverted
										as="h4"
										content="Group 3"
									/>
									<List link inverted>
										<List.Item as="a">Link One</List.Item>
										<List.Item as="a">Link Two</List.Item>
										<List.Item as="a">Link Three</List.Item>
										<List.Item as="a">Link Four</List.Item>
									</List>
								</Grid.Column>
								<Grid.Column>
									<Header
										inverted
										as="h4"
										content="Footer Header"
									/>
									<p>
										Extra space for a call to action inside
										the footer that could help re-engage
										users.
									</p>
								</Grid.Column>
							</Grid.Row>
						</Grid>
						<Divider inverted section />
						<Image src={logo} centered size="mini" />
						<List horizontal inverted divided link size="small">
							<List.Item as="a" href="#">
								Site Map
							</List.Item>
							<List.Item as="a" href="#">
								Contact Us
							</List.Item>
							<List.Item as="a" href="#">
								Terms and Conditions
							</List.Item>
							<List.Item as="a" href="#">
								Privacy Policy
							</List.Item>
						</List>
					</Container>
				</Segment>
			</div>
		);
	}
}
