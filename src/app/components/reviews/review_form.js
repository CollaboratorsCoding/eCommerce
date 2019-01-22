import React, { Component } from 'react';
import { Rating, Form, Button } from 'semantic-ui-react';

export default class ReviewForm extends Component {
	state = { rating: null };

	handleRate = (e, { rating }) => this.setState({ rating });

	handleSubmit = e => {
		const formData = new FormData(e.target);
		let data = {};

		e.preventDefault();

		/* eslint-disable-next-line */
		for (const entry of formData.entries()) {
			data[entry[0]] = entry[1];
		}
		if (this.state.rating) {
			data = {
				...data,
				rating: this.state.rating,
			};
		}

		if (this.props.parentReviewId) {
			data = {
				...data,
				parentReviewId: this.props.parentReviewId,
			};
		}
		if (this.props.parentReviewId && this.props.reply) {
			this.props.addReply(data);
			e.target.reset();
		} else {
			this.props.addReview(data, this.props.productSlug);
			this.setState({
				rating: null,
			});
			e.target.reset();
		}
	};

	render() {
		const { reply } = this.props;
		return (
			<Form className="form" onSubmit={this.handleSubmit}>
				<h1>Add Your {reply ? 'Reply' : 'Review'}</h1>
				<Form.Input
					icon="mail"
					// label={errors.email}
					iconPosition="left"
					// onChange={validateField}

					// error={errors.email}
					type="text"
					name="author"
					placeholder="Enter Your Name"
				/>
				<Form.Input
					icon="key"
					type="text"
					name="text"
					placeholder="Write Review Here"
					iconPosition="left"
				/>

				{!reply && (
					<Rating
						icon="star"
						rating={this.state.rating}
						maxRating={5}
						onRate={this.handleRate}
						size="large"
					/>
				)}

				<Button
					content="Sign In"
					icon="sign-in"
					labelPosition="left"
					type="submit"
				/>
			</Form>
		);
	}
}
