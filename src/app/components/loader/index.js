import React, { Component } from 'react';
import _ from 'lodash';

import './style.scss';

export default class Loading extends Component {
	state = {
		size: 0,
		percent: 0,
		active: false,
	};

	componentWillReceiveProps(nextProps) {
		const { show } = nextProps;
		if (show) {
			this.show();
		} else if (this.state.active) {
			this.hide();
		}
	}

	shouldComponentUpdate(nextProps, nextState) {
		return !_.isEqual(nextState, this.state);
	}

	getBarStyle() {
		const { percent } = this.state;
		const { color } = this.props;

		return {
			background: color,
			width: `${percent * 100}%`,
			display: percent > 0 ? 'block' : 'none',
		};
	}

	hide = () => {
		clearInterval(this.interval);
		this.interval = null;
		this.setState({
			size: 0,
			percent: 1,
			active: false,
		});

		setTimeout(() => {
			this.setState({
				percent: 0,
			});
		}, 500);
	};

	show = () => {
		const { percent, active } = this.state;
		const newPercent = this.calculatePercent(percent);
		if (!active) {
			this.interval = setInterval(this.show, 500);
		}
		this.setState(({ size }) => ({
			size,
			percent: newPercent,
			active: true,
		}));
	};

	calculatePercent = percent => {
		percent = percent || 0;
		let random = 0;
		if (percent >= 0 && percent < 0.25) {
			random = (Math.random() * (5 - 3 + 1) + 10) / 100;
		} else if (percent >= 0.25 && percent < 0.65) {
			random = (Math.random() * 3) / 100;
		} else if (percent >= 0.65 && percent < 0.9) {
			random = (Math.random() * 2) / 100;
		} else if (percent >= 0.9 && percent < 0.99) {
			random = 0.005;
		} else {
			random = 0;
		}
		percent += random;
		return percent;
	};

	render() {
		return (
			<div>
				<div className="loading">
					<div className="bar" style={this.getBarStyle()} />
				</div>
			</div>
		);
	}
}
