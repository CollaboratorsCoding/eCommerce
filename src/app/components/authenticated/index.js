import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const Authenticated = ({ component: Component, ...rest }) => (
	<Route
		{...rest}
		render={props =>
			rest.isLoggedIn ? (
				<Component {...props} />
			) : (
				<Redirect
					to={`/authentication?redirect=${props.location.pathname.replace(
						'/',
						''
					)}`}
				/>
			)
		}
	/>
);

const mapStateToProps = state => ({
	isLoggedIn: state.profile.isLoggedIn,
});

export default connect(
	mapStateToProps,
	null
)(Authenticated);
