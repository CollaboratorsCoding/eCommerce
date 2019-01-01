import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import queryString from 'query-string';

import ProfileActions from '../../store/profile/actions';
import Page from '../../components/page';

import SignIn from './components/SignIn';
import SignUp from './components/SignUp';

import './style/index.scss';

const { signin, signup } = ProfileActions;

class Authentication extends PureComponent {
	state = {
		queryForm: queryString.parse(this.props.location.search).form,
	};

	switchForm = form => {
		this.setState({ queryForm: form });
		this.setQuery('form', form);
	};

	setQuery = (query, value) => {
		const searchParams = new URLSearchParams(this.props.location.search);

		if (searchParams.has(query)) {
			searchParams.set(query, value);
		} else {
			searchParams.append(query, value);
		}

		this.props.history.push({
			pathname: this.props.location.pathname,
			search: `?${searchParams.toString()}`,
		});
	};

	handleSubmit = e => {
		const formData = new FormData(e.target);
		const data = {};

		e.preventDefault();

		/* eslint-disable-next-line */
		for (const entry of formData.entries()) {
			data[entry[0]] = entry[1];
		}
		if (this.state.queryForm === 'signup') {
			return this.props.signup(data);
		}
		return this.props.signin(data);
	};

	render() {
		const { queryForm } = this.state;
		return (
			<Page
				id="Auth"
				title="Authentication"
				description="This is Authentication really cool stuff."
			>
				<div className="form-container">
					{!queryForm || queryForm === 'signin' ? (
						<SignIn
							switchForm={this.switchForm}
							handleSubmit={this.handleSubmit}
						/>
					) : (
						<SignUp
							switchForm={this.switchForm}
							handleSubmit={this.handleSubmit}
						/>
					)}
				</div>
			</Page>
		);
	}
}

const mapStateToProps = state => ({
	cart: state.market.cart,
});

const mapDispatchToProps = dispatch =>
	bindActionCreators({ signin, signup }, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Authentication);
