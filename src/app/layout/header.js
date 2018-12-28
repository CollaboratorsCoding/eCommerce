import _ from 'lodash';
import React, { Component } from 'react';

import {
	Container,
	Dropdown,
	Image,
	Menu,
	Label,
	Visibility,
	Icon,
} from 'semantic-ui-react';
import CustomLink from '../hocs/customLink';
import { Homepage, About, AddProduct, Cart } from '../routes';
import logo from '../assets/logo.png';

const unAuthLinks = [
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

const authLinks = [
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
	{
		to: '/add',
		text: 'Add',
		componentPromise: AddProduct,
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

export default class Header extends Component {
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
		const { current, totalQty, user } = this.props;
		const links = user.isLoggedIn ? authLinks : unAuthLinks;
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
									<CustomLink
										to="/cart"
										componentPromise={Cart}
									>
										<Icon.Group size="big">
											<Icon
												className="cart--menu"
												color="black"
												name="shopping basket"
											/>
											{totalQty ? (
												<Label
													circular
													size="mini"
													color="teal"
													floating
												>
													{totalQty}
												</Label>
											) : null}
										</Icon.Group>
									</CustomLink>
								</Menu.Item>

								{user.isLoggedIn ? (
									<Dropdown
										text={user.profile.name}
										pointing
										className="link item"
									>
										<Dropdown.Menu>
											<Dropdown.Item>
												List Item
											</Dropdown.Item>
											<Dropdown.Item>
												List Item
											</Dropdown.Item>
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
											<Dropdown.Item>
												List Item
											</Dropdown.Item>
										</Dropdown.Menu>
									</Dropdown>
								) : (
									<>
										<HeaderLink
											current={current}
											to="/signin"
											text="SignIn"
										/>

										<HeaderLink
											current={current}
											to="/signup"
											text="SignUp"
										/>
									</>
								)}
							</Menu.Menu>
						</Container>
					</Menu>
				</Visibility>
			</div>
		);
	}
}
