import React, { PureComponent } from 'react';
import _ from 'lodash';
import Steps from 'rc-steps';
import { Icon } from 'semantic-ui-react';
import queryString from 'query-string';

import { Link } from 'react-router-dom';
import withValidations from '../../../hocs/withValidations';

import FormContact from './FormContact';
import FormShipping from './FormShipping';
import FormConfirm from './FormConfirm';
import ProductList from './ProductList';

const orderTypes = require('../../../../../server/type_models/order.types');

const Step = Steps.Step;

const steps = [
	{
		title: 'Enter your contact information',
		icon: <Icon name="clipboard outline" />,
	},
	{
		title: 'Choose your shipping options',
		icon: <Icon name="truck" />,
	},
	{
		title: 'Confirm Order',
		icon: <Icon name="info" />,
	},
];

class Checkout extends PureComponent {
	state = {
		current:
			Number(queryString.parse(this.props.location.search).step) || 1,
		form: {
			1: {
				data: {
					email: '',
					name: '',
					phone: '',
				},
				isValid: false,
			},
			2: {
				data: {
					address: '',
				},
				isValid: false,
			},
			3: {
				isValid: true,
			},
		},
	};

	componentDidMount() {
		const queryStep = Number(
			queryString.parse(this.props.location.search).step
		);
		if (!queryStep || queryStep <= 0 || queryStep > 1) {
			this.switchStep(1);
		}
	}

	componentDidUpdate(prevProps) {
		const queryStep = Number(
			queryString.parse(this.props.location.search).step
		);
		const step = this.state.current;
		const form = this.state.form;

		if (!_.isEqual(prevProps.errors, this.props.errors)) {
			this.setState({
				form: {
					...form,
					[step]: {
						...form[step],
						isValid: _.isEmpty(this.props.errors),
					},
				},
			});
		}
		if (this.state.current !== queryStep) {
			let allValid = true;
			let invalidStep = null;

			/* eslint-disable-next-line */
			for (const key in form) {
				/* eslint-disable-next-line */
				if (form.hasOwnProperty(key) && key <= this.state.current) {
					const element = form[key];
					if (!element.isValid) {
						allValid = false;
						invalidStep = key;
						break;
					}
				}
			}
			if (allValid) {
				this.setState({
					current: queryStep,
				});
			}
			if (!allValid && queryStep) {
				this.switchStep(
					Number(invalidStep) <= queryStep
						? Number(invalidStep)
						: queryStep
				);
				this.setState({
					current:
						Number(invalidStep) <= queryStep
							? Number(invalidStep)
							: queryStep,
				});
			}
		}
	}

	next = async () => {
		const { validateForm } = this.props;
		const step = this.state.current;
		const form = this.state.form;
		await validateForm(form[step].data);

		if (_.isEmpty(this.props.errors) || form[step].isValid) {
			if (!form[step + 1]) {
				this.props.addOrder({ ...form[1].data, ...form[2].data });
			} else {
				await this.setState({
					form: { ...form, [step]: { ...form[step], isValid: true } },
				});
				this.switchStep(this.state.current + 1);
			}
		}
	};

	prev = () => {
		this.switchStep(this.state.current - 1);
	};

	switchStep = step => {
		this.props.switchPage({ step });
	};

	handleChange = e => {
		this.props.validateField(e);
		const name = e.target.name;
		const value = e.target.value;
		const step = this.state.current;
		const form = this.state.form;
		const currentForm = {
			...form,
			[step]: {
				...form[step],
				data: { ...form[step].data, [name]: value },
			},
		};

		this.setState({ form: currentForm });
	};

	render() {
		const { current, form } = this.state;
		return (
			<div className="checkout">
				<Steps current={current - 1}>
					{steps.map(item => (
						<Step
							key={item.title}
							title={item.title}
							icon={item.icon}
						/>
					))}
				</Steps>
				<div className="steps-content">
					<div className="steps-content--left">
						{current === 1 && (
							<FormContact
								form={form[1]}
								errors={this.props.errors}
								handleChange={this.handleChange}
								handleSubmit={this.next}
							/>
						)}
						{current === 2 && (
							<FormShipping
								errors={this.props.errors}
								form={form[2]}
								handleChange={this.handleChange}
								handleSubmit={this.next}
								prev={this.prev}
							/>
						)}
						{current === 3 && (
							<FormConfirm
								form={{ ...form[1].data, ...form[2].data }}
								handleSubmit={this.next}
								prev={this.prev}
							/>
						)}
					</div>
					<div className="steps-content--right">
						<div className="steps-content--right--content">
							<ProductList cart={this.props.cart} />
							<br />
							<div className="steps-content--right--content-tocart">
								<Link to="/cart">Update cart</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default withValidations(orderTypes.Orderform)(Checkout);
