import React, { Component } from 'react';
import { Pagination, Icon } from 'semantic-ui-react';
import { withRouter } from 'react-router';
import _ from 'lodash';
import { frontloadConnect } from '../../hocs/frontLoad';
import ReviewItem from './review_item';
import ReviewForm from './review_form';
import { setQuery } from '../../utils';

import './index.scss';

const frontload = async props => {
	const { p, l } = props.query;
	// if (!_.get(props, `product.reviews[${p || '1'}].length`)) {
	// 	await props.onGetReviews(p, l, props.product._id);
	// }

	await props.onGetReviews(p, l, props.productSlug);
};

class Review extends Component {
	constructor(props) {
		super(props);
		this.state = {
			activePage: props.query.p || 1,
			parentReviewId: null,
			replyFormActive: false,
		};
	}

	handlePaginationChange = (e, { activePage }) => {
		setQuery({ p: activePage }, this.props.history);
		this.setState({ activePage });
		if (!_.get(this.props, `product.reviews[${activePage}].length`, null)) {
			this.props.onGetReviews(activePage, 10, this.props.productSlug);
		}
	};

	countPages = items => Math.ceil(items / 10);

	handleReplyClick = parentReviewId => {
		this.setState({
			parentReviewId,
			replyFormActive: true,
		});
	};

	render() {
		const { product, onAddReview, productSlug, onAddReply } = this.props;
		const { activePage, parentReviewId, replyFormActive } = this.state;

		let renderReviews = null;
		if (_.get(product, `reviews[${activePage}].length`, null)) {
			renderReviews = product.reviews[activePage].map(review => (
				<ReviewItem
					handleReplyClick={this.handleReplyClick}
					handleReviewRate={this.props.onHandleAddReviewRate}
					key={review._id}
					review={review}
				/>
			));
		}

		return (
			<>
				{replyFormActive && (
					<div>
						FORM FOR REPLY:
						<ReviewForm
							reply
							parentReviewId={parentReviewId}
							addReply={data => {
								onAddReply(data);
								this.setState({
									replyFormActive: false,
								});
							}}
						/>{' '}
					</div>
				)}
				{renderReviews ? (
					<>
						<div className="reviews-wrapper">{renderReviews}</div>
						<Pagination
							activePage={activePage}
							boundaryRange={1}
							onPageChange={this.handlePaginationChange}
							ellipsisItem={{
								content: <Icon name="ellipsis horizontal" />,
								icon: true,
							}}
							firstItem={{
								content: <Icon name="angle double left" />,
								icon: true,
							}}
							lastItem={{
								content: <Icon name="angle double right" />,
								icon: true,
							}}
							prevItem={{
								content: <Icon name="angle left" />,
								icon: true,
							}}
							nextItem={{
								content: <Icon name="angle right" />,
								icon: true,
							}}
							totalPages={this.countPages(product.reviewsCount)}
						/>
					</>
				) : (
					'No reviews yet... Be first!'
				)}
				<ReviewForm productSlug={productSlug} addReview={onAddReview} />{' '}
			</>
		);
	}
}

export default withRouter(
	frontloadConnect(frontload, {
		onMount: true,
		onUpdate: false,
	})(Review)
);
