import React, { Component } from 'react';
import { Comment, Pagination, Icon } from 'semantic-ui-react';
import { withRouter } from 'react-router';
import _ from 'lodash';
import { frontloadConnect } from '../../hocs/frontLoad';
import ReviewItem from './review_item';
import ReviewForm from './review_form';
import { setQuery } from '../../utils';

const frontload = async props => {
	const { p, l } = props.query;
	await props.onGetReviews(p, l, props.product._id);
};

class Review extends Component {
	constructor(props) {
		super(props);
		this.state = {
			activePage: props.query.p || 1,
		};
	}

	handlePaginationChange = (e, { activePage }) => {
		console.log(activePage);
		setQuery('p', activePage, this.props.history);
		this.setState({ activePage });
	};

	countPages = items => Math.round(items / 10);

	render() {
		const { product, onAddReview } = this.props;
		const { activePage } = this.state;
		console.log(this.countPages(product.reviewCount));
		let renderReviews = null;
		if (_.get(product, `reviews[${activePage}]`)) {
			renderReviews = product.reviews[activePage].map(review => (
				<ReviewItem key={review._id} review={review} />
			));
		}
		return (
			<div>
				{renderReviews ? (
					<Comment.Group>{renderReviews}</Comment.Group>
				) : null}
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
					totalPages={this.countPages(product.reviewCount)}
				/>
				<ReviewForm addReview={onAddReview} />{' '}
			</div>
		);
	}
}

export default withRouter(
	frontloadConnect(frontload, {
		onMount: true,
		onUpdate: false,
	})(Review)
);
