import React, { PureComponent } from 'react';
import { withRouter } from 'react-router';

class CustomLink extends PureComponent {
	handleClick = e => {
		e.preventDefault();
		const { componentPromise, history, to } = this.props;
		if (componentPromise) {
			componentPromise.preload().then(() => {
				history.push(to);
			});
		} else {
			history.push(to);
		}
	};

	render() {
		const {
			componentPromise,
			staticContext,
			match,
			location,
			history,
			children,
			...rest
		} = this.props;
		return (
			<a {...rest} onClick={this.handleClick}>
				{children}
			</a>
		);
	}
}

export default withRouter(CustomLink);
