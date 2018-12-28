import React from 'react';
import { Rating, Comment } from 'semantic-ui-react';
import { weekDayFormat } from '../../utils';

export default function ReviewItem({ review }) {
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
			</Comment.Content>
		</Comment>
	);
}
