import React from 'react';
import { Rating, Comment } from 'semantic-ui-react';
import { weekDayFormat } from '../../utils';

export default function ReviewItem({ review, handleReplyClick }) {
	let reviewReplies = null;
	if (review && review.replies && review.replies.length) {
		reviewReplies = review.replies.map(reply => (
			<Comment.Group key={reply._id}>
				<Comment>
					<Comment.Content>
						<Comment.Author>{reply.author}</Comment.Author>
						<Comment.Metadata>
							<div>
								{weekDayFormat(
									new Date(reply.date).getUTCDay()
								)}
							</div>
						</Comment.Metadata>
						<Comment.Text>{reply.text}</Comment.Text>
					</Comment.Content>
				</Comment>
			</Comment.Group>
		));
	}
	return (
		<Comment>
			<Comment.Content>
				<Comment.Author>{review.author}</Comment.Author>
				<Comment.Metadata>
					<div>
						{weekDayFormat(new Date(review.date).getUTCDay())}
					</div>
					<div>
						{review.rating ? (
							<Rating
								icon="star"
								rating={review.rating}
								maxRating={5}
								disabled
							/>
						) : (
							'Not Rated'
						)}
					</div>
				</Comment.Metadata>
				<Comment.Text>{review.text}</Comment.Text>
				<Comment.Actions>
					<Comment.Action
						onClick={() => handleReplyClick(review._id)}
					>
						Reply
					</Comment.Action>
				</Comment.Actions>
			</Comment.Content>
			{reviewReplies}
		</Comment>
	);
}
