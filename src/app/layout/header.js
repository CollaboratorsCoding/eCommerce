import _ from 'lodash';
import React, { Component } from 'react';

import { withRouter } from 'react-router';

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
import {
	Homepage,
	About,
	Cart,
	Authentication,
	OrderHistory,
} from '../routes';
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
	boxShadow: '0 0 8px 0 rgba(0,0,0,.1)',

	transition: 'box-shadow 0.5s ease, padding 0.5s ease',
};

const fixedMenuStyle = {
	backgroundColor: '#fff',
	border: '1px solid #ddd',
	boxShadow: '0 0 8px 0 rgba(0,0,0,.1)',
};

class Header extends Component {
	state = {
		menuFixed: false,
		showMobile: false,
	};

	componentDidUpdate = (prevProps, prevState) => {
		if (
			prevState.showMobile &&
			prevProps.location.pathname !== this.props.location.pathname
		) {
			this.setState({
				showMobile: false,
			});
		}
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
		const { menuFixed, showMobile } = this.state;
		const { current, totalQty, user, logout } = this.props;
		const links = user.isLoggedIn ? authLinks : unAuthLinks;
		return (
			<div>
				{/* Heads up, style below isn't necessary for correct work of example, simply our docs defines other
            background color.
          */}
				{/* Attaching the top menu is a simple operation, we only switch `fixed` prop and add another style if it has
            gone beyond the scope of visibility
		  */}{' '}
				<Visibility
					className="mobile-menu"
					onBottomPassed={this.stickTopMenu}
					onBottomVisible={this.unStickTopMenu}
					once={false}
				>
					<Menu
						borderless
						vertical
						fluid
						fixed={menuFixed ? 'top' : undefined}
						style={menuFixed ? fixedMenuStyle : menuStyle}
					>
						<Container>
							<Menu.Item header>
								<Image size="tiny" src={logo} />
								DemoStore
								<Icon
									className="mobile-bars"
									name="bars"
									onClick={() => {
										this.setState(prevState => ({
											showMobile: !prevState.showMobile,
										}));
									}}
								/>
							</Menu.Item>

							{showMobile && (
								<>
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

										{user.isLoggedIn ? (
											<Dropdown
												text={user.profile.name}
												pointing
												className="link item"
											>
												<Dropdown.Menu>
													<Dropdown.Item>
														<CustomLink
															to="/orders-history"
															componentPromise={
																OrderHistory
															}
														>
															My orders
														</CustomLink>
													</Dropdown.Item>

													<Dropdown.Divider />
													<Dropdown.Item
														onClick={logout}
													>
														Logout
													</Dropdown.Item>
												</Dropdown.Menu>
											</Dropdown>
										) : (
											<HeaderLink
												current={current}
												to="/authentication"
												text="Authentication"
												componentPromise={
													Authentication
												}
											/>
										)}
									</Menu.Menu>
								</>
							)}
						</Container>
					</Menu>
				</Visibility>
				<Visibility
					className="lg-menu"
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
								<Image size="tiny" src={logo} />
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
												<CustomLink
													to="/orders-history"
													componentPromise={
														OrderHistory
													}
												>
													My orders
												</CustomLink>
											</Dropdown.Item>

											<Dropdown.Divider />
											<Dropdown.Item onClick={logout}>
												Logout
											</Dropdown.Item>
										</Dropdown.Menu>
									</Dropdown>
								) : (
									<HeaderLink
										current={current}
										to="/authentication"
										text="Authentication"
										componentPromise={Authentication}
									/>
								)}
							</Menu.Menu>
						</Container>
					</Menu>
				</Visibility>
			</div>
		);
	}
}
export default withRouter(Header);
