import React, { Component } from 'react';
import Steps from 'rc-steps';
import { Button, Icon } from 'semantic-ui-react';

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

export default class Checkout extends Component {
	state = {
		current: 0,
	};

	next = () =>
		this.setState(prevState => ({ current: prevState.current + 1 }));

	prev = () =>
		this.setState(prevState => ({ current: prevState.current - 1 }));

	render() {
		const { current } = this.state;
		return (
			<div className="checkout">
				<Steps current={current}>
					{steps.map(item => (
						<Step
							key={item.title}
							title={item.title}
							icon={item.icon}
						/>
					))}
				</Steps>
				<div className="steps-content">test</div>
				<div className="steps-action">
					{current > 0 && (
						<Button
							style={{ marginLeft: 8 }}
							onClick={() => this.prev()}
						>
							Previous
						</Button>
					)}
					{current === steps.length - 1 && (
						<Button type="primary">Done</Button>
					)}
					{current < steps.length - 1 && (
						<Button type="primary" onClick={() => this.next()}>
							Next
						</Button>
					)}
				</div>
			</div>
		);
	}
}
