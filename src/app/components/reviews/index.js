import React, { Component } from 'react';
import { Comment, Pagination } from 'semantic-ui-react';
import { frontloadConnect } from '../../hocs/frontLoad';
import ReviewItem from './review_item';
import ReviewForm from './review_form';

const frontload = async props => {
	const { p, l, reviews } = props.query;
	if (reviews) {
		await props.onGetReviews(p, l, props.product._id);
	}
};

class Review extends Component {
	changeQueryPage = page =>
		this.props.history.push({
			pathname: this.props.location.pathname,
			search: `?p=${page}`,
		});

	handlePaginationChange = (e, { activePage }) =>
		this.setState({ activePage });

	changeQueryPage = page =>
		this.props.history.push({
			pathname: this.props.location.pathname,
			search: `?page=${page}`,
		});

	render() {
		const { product, onAddReview, query, history } = this.props;
		console.log(product);
		const renderReviews = null;
		const currentPage = query.p;
		// if (product.reviews && product.reviews.length) {
		// 	renderReviews = product.reviews.map(review => (
		// 		<ReviewItem key={review._id} review={review} />
		// 	));
		// }
		return (
			<div>
				{renderReviews ? (
					<Comment.Group>{renderReviews}</Comment.Group>
				) : null}
				<Pagination
					activePage={currentPage}
					boundaryRange={1}
					onPageChange={this.handlePaginationChange}
					size="mini"
					siblingRange={siblingRange}
					totalPages={totalPages}
					// Heads up! All items are powered by shorthands, if you want to hide one of them, just pass `null` as value
					ellipsisItem={showEllipsis ? undefined : null}
					firstItem={showFirstAndLastNav ? undefined : null}
					lastItem={showFirstAndLastNav ? undefined : null}
					prevItem={showPreviousAndNextNav ? undefined : null}
					nextItem={showPreviousAndNextNav ? undefined : null}
				/>
				<ReviewForm addReview={onAddReview} />{' '}
			</div>
		);
	}
}

export default frontloadConnect(frontload, {
	onMount: true,
	onUpdate: false,
})(Review);
