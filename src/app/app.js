// The basics
import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import 'semantic-ui-css/semantic.min.css';
// Action creators and helpers

import Layout from './layout';
import Routes from './routes';

import './app.scss';

class App extends Component {
	componentWillMount = () => {};

	render() {
		return (
			<div id="app">
				<Layout current={this.props.location.pathname}>
					<div id="content">
						<Routes />
					</div>
				</Layout>
			</div>
		);
	}
}

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
