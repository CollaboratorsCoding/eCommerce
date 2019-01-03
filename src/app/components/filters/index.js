import React, { Component } from 'react';
import { Input, Button } from 'semantic-ui-react';

const Slider = require('rc-slider');

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);
export default class FilterList extends Component {
	constructor(props) {
		super(props);

		this.state = {
			sliderValues: [
				parseFloat(props.filters.min),
				parseFloat(props.filters.max),
			],
		};
	}

	handleChange = sliderValues => {
		const { filters } = this.props;
		if (sliderValues[0] >= filters.min && sliderValues[1] <= filters.max) {
			this.setState({ sliderValues });
		}
	};

	handleMinChange = (e, data) => {
		this.setState(({ sliderValues }) => ({
			sliderValues: [parseFloat(data.value), sliderValues[1]],
		}));
	};

	handleMaxChange = (e, data) => {
		this.setState(({ sliderValues }) => ({
			sliderValues: [sliderValues[0], parseFloat(data.value)],
		}));
	};

	render() {
		const { sliderValues } = this.state;
		const { filters } = this.props;
		return (
			<div>
				<Input
					placeholder="min"
					value={sliderValues[0]}
					onChange={this.handleMinChange}
				/>
				<Input
					placeholder="max"
					value={sliderValues[1]}
					onChange={this.handleMaxChange}
				/>
				<Button type="submit">OK</Button>
				<Range
					min={filters.min}
					max={filters.max}
					onChange={this.handleChange}
					value={sliderValues}
					tipFormatter={value => (
						<span className="tooltip">${value}</span>
					)}
				/>
			</div>
		);
	}
}
