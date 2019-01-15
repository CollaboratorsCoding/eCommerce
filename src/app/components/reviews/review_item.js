import React from 'react';
import { Rating, Icon } from 'semantic-ui-react';
import { weekDayFormat } from '../../utils';

export default function ReviewItem({ review, handleReplyClick }) {
	const formatComment = (rev, isReply, replies) => (
		<div className="review-wrapper">
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
						<span>
							<Icon
								onClick={() => {}}
								size="large"
								className="review-up-btn"
								name="thumbs up outline"
							/>
						</span>
						<span>
							<Icon
								onClick={() => {}}
								size="large"
								className="review-down-btn"
								name="thumbs down outline"
							/>
						</span>
					</div>
				</div>
			)}

			{replies && <div className="review-replies"> {replies} </div>}
		</div>
	);
	let replies;
	if (review && review.replies && review.replies.length) {
		replies = review.replies.map(reply => formatComment(reply, true));
	}
	const reviewsWithReplies = formatComment(review, false, replies);

	return reviewsWithReplies;
}
