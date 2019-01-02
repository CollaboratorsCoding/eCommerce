import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Embed } from 'semantic-ui-react';

import ProfileActions from '../../store/profile/actions';
import Page from '../../components/page';
import './about.scss';

const { signin, signup } = ProfileActions;

class About extends PureComponent {
	componentDidMount = () => {};

	render() {
		return (
			<Page
				id="about"
				title="About"
				description="This is about really cool stuff."
			>
				<Embed
					id="WWaLxFIVX1s"
					placeholder="https://lumiere-a.akamaihd.net/v1/images/Darth-Vader_6bda9114.jpeg?region=0%2C23%2C1400%2C785&width=960"
					source="youtube"
				/>
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
)(About);
