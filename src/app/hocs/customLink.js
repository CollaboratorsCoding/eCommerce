import React, { PureComponent } from 'react';
import { withRouter } from 'react-router';

import LoaderContext from '../context';

class CustomLink extends PureComponent {
	handleClick = async (e, setLoader) => {
		e.preventDefault();
		const { componentPromise, history, to } = this.props;
		if (componentPromise) {
			await setLoader(true);
			componentPromise
				.preload()
				.then(() => {
					history.push(to);
					setLoader(false);
				})
				.catch(error => {
					console.log(error);
					setLoader(false);
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
			<LoaderContext.Consumer>
				{setLoader => (
					<a {...rest} onClick={e => this.handleClick(e, setLoader)}>
						{children}
					</a>
				)}
			</LoaderContext.Consumer>
		);
	}
}

export default withRouter(CustomLink);
