import React, { Component } from 'react';
import { Comment } from 'semantic-ui-react';
import { frontloadConnect } from '../../hocs/frontLoad';
import ReviewItem from './review_item';
import ReviewForm from './review_form';

const frontload = async props => {
	const { offset, limit, reviews } = props.query;
	if (reviews) {
		await props.onGetReviews(offset, limit, props.product._id);
	}
};

class Review extends Component {
	componentDidMount = () => {};

	changeQueryPage = page =>
		this.props.history.push({
			pathname: this.props.location.pathname,
			search: `?page=${page}`,
		});

	render() {
		const { product, onAddReview } = this.props;

		let renderReviews = null;
		if (product.reviews && product.reviews.length) {
			renderReviews = product.reviews.map(review => (
				<ReviewItem key={review._id} review={review} />
			));
		}
		return (
			<div>
				{renderReviews ? (
					<Comment.Group>{renderReviews}</Comment.Group>
				) : null}
				<ReviewForm addReview={onAddReview} />{' '}
			</div>
		);
	}
}

export default frontloadConnect(frontload, {
	onMount: true,
	onUpdate: false,
})(Review);
