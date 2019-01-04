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
				parseFloat(props.filtersExisting.price.min) ||
					parseFloat(props.filtersData.min),
				parseFloat(props.filtersExisting.price.max) ||
					parseFloat(props.filtersData.max),
			],
		};
	}

	handleChange = sliderValues => {
		const { filtersData } = this.props;
		if (
			sliderValues[0] >= filtersData.min &&
			sliderValues[1] <= filtersData.max
		) {
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

	handleApplyFilters = () => {
		const { sliderValues } = this.state;
		this.props.handleApplyFilters(
			`price=${sliderValues[0] || ''}-${sliderValues[1] || ''}`
		);
	};

	render() {
		const { sliderValues } = this.state;
		const { filtersData } = this.props;
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
				<Button type="submit" onClick={this.handleApplyFilters}>
					OK
				</Button>
				<Range
					min={filtersData.min}
					max={filtersData.max}
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
