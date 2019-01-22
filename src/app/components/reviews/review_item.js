import React, { Component } from 'react';
import { Rating, Icon } from 'semantic-ui-react';
import { weekDayFormat } from '../../utils';

export default class ReviewItem extends Component {
	state = {
		showMoreReplies: false,
	};

	formatComment = (rev, isReply, replies) => {
		const { showMoreReplies } = this.state;
		const { handleReplyClick, handleReviewRate } = this.props;
		return (
			<div
				className={`review-wrapper ${rev.isNew ? 'new-review' : ''}`}
				key={isReply ? rev._id : null}
			>
				<div className="review-header">
					<div className="review-author">{rev.author}</div>
					{!isReply && (
						<div className="review-rating">
							{rev.rating ? (
								<Rating
									icon="star"
									rating={rev.rating}
									maxRating={5}
									disabled
								/>
							) : (
								'Not Rated'
							)}
						</div>
					)}

					<div className="review-date">
						{weekDayFormat(new Date(rev.date).getUTCDay())}
					</div>
				</div>
				<div className="review-content">{rev.text}</div>

				{!isReply && (
					<div className="review-actions">
						<div className="review-reply-btn">
							<span onClick={() => handleReplyClick(rev._id)}>
								Reply
							</span>
						</div>

						<div className="review-upvotes">
							<span className="review-up">
								{rev.upvotes}
								<Icon
									onClick={() => {
										handleReviewRate(rev._id, 1);
									}}
									size="large"
									className="review-up-btn"
									name="thumbs up outline"
								/>
							</span>
							<span className="review-down">
								{rev.downvotes}
								<Icon
									onClick={() => {
										handleReviewRate(rev._id, -1);
									}}
									size="large"
									className="review-down-btn"
									name="thumbs down outline"
								/>
							</span>
						</div>
					</div>
				)}

				{replies && (
					<div className="review-replies">
						{!showMoreReplies && replies.length > 3 && (
							<div
								className="showmore-btn"
								onClick={() => {
									this.setState({
										showMoreReplies: true,
									});
								}}
							>
								Show More
							</div>
						)}{' '}
						{replies.slice(0, showMoreReplies ? undefined : 3)}
					</div>
				)}
			</div>
		);
	};

	render() {
		const { review } = this.props;

		let replies;
		if (review && review.replies && review.replies.length) {
			replies = review.replies.map(reply =>
				this.formatComment(reply, true)
			);
		}
		const reviewsWithReplies = this.formatComment(review, false, replies);

		return reviewsWithReplies;
	}
}
