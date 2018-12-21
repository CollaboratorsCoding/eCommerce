import React, { PureComponent } from 'react';
import { withRouter } from 'react-router';

class CustomLink extends PureComponent {
	handleClick = e => {
		e.preventDefault();
		const { componentPromise, history, to } = this.props;

		componentPromise.preload().then(() => {
			history.push(to);
		});
	};

	render() {
		const { text, ...rest } = this.props;
		return (
			<a {...rest} onClick={this.handleClick}>
				{text}
			</a>
		);
	}
}

export default withRouter(CustomLink);
