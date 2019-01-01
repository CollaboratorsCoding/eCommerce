import React from 'react';
import { connect } from 'react-redux';
import queryString from 'query-string';
import { Route, Redirect } from 'react-router-dom';

const Unauthenticated = ({ component: Component, ...rest }) => {
	const query = queryString.parse(rest.location.search);
	const redirectPath = query.redirect || '';

	return (
		<Route
			{...rest}
			render={props =>
				!rest.isLoggedIn ? (
					<Component {...props} />
				) : (
					<Redirect to={`/${redirectPath}`} />
				)
			}
		/>
	);
};

const mapStateToProps = state => ({
	isLoggedIn: state.profile.isLoggedIn,
});

export default connect(
	mapStateToProps,
	null
)(Unauthenticated);
