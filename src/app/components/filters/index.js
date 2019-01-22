import React, { Component } from 'react';
import _ from 'lodash';
import { Input, Button } from 'semantic-ui-react';
import './index.scss';

const Slider = require('rc-slider');

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);
export default class FilterList extends Component {
	constructor(props) {
		super(props);

		this.state = {
			sliderValues: [
				parseFloat(_.get(props, 'filtersExisting.price.min')) ||
					parseFloat(_.get(props, 'filtersData.min'), 0),
				parseFloat(_.get(props, 'filtersExisting.price.max')) ||
					parseFloat(_.get(props, 'filtersData.max'), 0),
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
		const { filtersData } = this.props;
		if (
			parseFloat(data.value) >= filtersData.min &&
			parseFloat(data.value) <= filtersData.max
		) {
			this.setState(({ sliderValues }) => ({
				sliderValues: [parseFloat(data.value), sliderValues[1]],
			}));
		}
	};

	handleMaxChange = (e, data) => {
		const { filtersData } = this.props;
		if (
			parseFloat(data.value) >= filtersData.min &&
			parseFloat(data.value) <= filtersData.max
		) {
			this.setState(({ sliderValues }) => ({
				sliderValues: [sliderValues[0], parseFloat(data.value)],
			}));
		}
	};

	handleApplyFilters = () => {
		const { sliderValues } = this.state;
		this.props.handleApplyFilters(
			`price=${sliderValues[0] || ''}-${sliderValues[1] || ''}`
		);
	};

	render() {
		const { sliderValues } = this.state;
		const { filtersData, filtersExisting } = this.props;

		if (!filtersData || !filtersExisting) return null;
		return (
			<section className="filters-wrapper">
				<div>Price Range</div>
				<div className="input-wrapper">
					<Input
						fluid
						className="min-input"
						placeholder="min"
						value={sliderValues[0]}
						onChange={this.handleMinChange}
					/>
					<Input
						fluid
						className="max-input"
						placeholder="max"
						value={sliderValues[1]}
						onChange={this.handleMaxChange}
					/>
					<Button type="submit" onClick={this.handleApplyFilters}>
						OK
					</Button>
				</div>

				<Range
					min={filtersData.min}
					max={filtersData.max}
					onChange={this.handleChange}
					value={sliderValues}
					tipFormatter={value => (
						<span className="tooltip">${value}</span>
					)}
				/>
			</section>
		);
	}
}
