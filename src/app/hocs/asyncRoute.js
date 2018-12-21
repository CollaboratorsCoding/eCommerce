import React, { PureComponent } from 'react';

export default class AsyncRoute extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			Component: null,
		};
	}

	componentDidMount() {
		const { componentPromise } = this.props;

		componentPromise.then(component => {
			console.log(component);
			setTimeout(() => {
				this.setState({
					Component: component.default,
				});
			}, 4000);
		});
	}

	render() {
		const { Component } = this.state;

		if (!Component) {
			return null; // You can return some spinner here
		}

		return <Component {...this.props} />;
	}
}
