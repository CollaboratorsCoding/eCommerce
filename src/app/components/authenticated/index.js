import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const Authenticated = ({
	component: Component,
	loading,
	isLoggedIn,
	...rest
}) => (
	<Route
		{...rest}
		render={props =>
			isLoggedIn || loading ? (
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
	loading: state.profile.userLoading,
});

export default connect(
	mapStateToProps,
	null
)(Authenticated);
