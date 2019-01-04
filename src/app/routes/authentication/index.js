import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import queryString from 'query-string';

import ProfileActions from '../../store/profile/actions';
import Page from '../../components/page';

import SignIn from './components/SignIn';
import SignUp from './components/SignUp';

import { setQuery } from '../../utils';

import './style/index.scss';

const { signin, signup } = ProfileActions;

class Authentication extends PureComponent {
	state = {
		queryForm: queryString.parse(this.props.location.search).form,
	};

	switchForm = form => {
		this.setState({ queryForm: form });
		setQuery('form', form, this.props.history);
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
							serverError={this.props.serverError}
							handleSignIn={this.props.signin}
						/>
					) : (
						<SignUp
							switchForm={this.switchForm}
							serverError={this.props.serverError}
							handleSignUp={this.props.signup}
						/>
					)}
				</div>
			</Page>
		);
	}
}

const mapStateToProps = state => ({
	cart: state.market.cart,
	serverError: state.profile.error,
});

const mapDispatchToProps = dispatch =>
	bindActionCreators({ signin, signup }, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Authentication);
