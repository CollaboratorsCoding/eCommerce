import React, { Component } from 'react';
import { Rating } from 'semantic-ui-react';

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
			<form onSubmit={this.handleSubmit}>
				<input
					type="text"
					name="author"
					placeholder="Enter Your Name"
				/>
				<input
					type="text"
					name="text"
					placeholder="Write Review Here"
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

				<button type="submit">Send</button>
			</form>
		);
	}
}
