import React, { PureComponent } from 'react';
import { withRouter } from 'react-router';

class CustomLink extends PureComponent {
	handleClick = () => {
		const { componentPromise, history, to } = this.props;

		componentPromise.preload().then(() => {
			history.push(to);
		});
	};

	render() {
		const { text } = this.props;
		return <div onClick={this.handleClick}>{text}</div>;
	}
}

export default withRouter(CustomLink);
