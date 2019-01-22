// The basics
import React from 'react';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';

// Action creators and helpers
import ScrollTop from './hocs/scrollTop';
import Layout from './layout';
import Routes from './routes';

import './app.scss';

const App = props => (
	<div id="app">
		<ScrollTop>
			<Layout current={props.location.pathname}>
				<div id="content">
					<Routes />
				</div>
			</Layout>
		</ScrollTop>
	</div>
);

const mapStateToProps = state => ({
	isAuthenticated: state.profile.isAuthenticated,
	pathname: state.router.location.pathname,
	search: state.router.location.search,
	hash: state.router.location.hash,
});

export default withRouter(
	connect(
		mapStateToProps,
		null
	)(App)
);
