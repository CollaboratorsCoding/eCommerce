import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button, Rating, Comment } from 'semantic-ui-react';
import Page from '../../components/page';
import { frontloadConnect } from '../../hocs/frontLoad';
import MarketActions from '../../store/market/actions';
import { weekDayFormat } from '../../utils';

const { getProduct, addToCartProduct, addReview } = MarketActions;

const frontload = async props =>
	await props.getProduct(props.match.params.slug_product);
export class Category extends Component {
	state = {
		rating: 0,
	};

	componentDidMount = () => {
		console.log('COMPONENT', this.props.product);
	};

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

		this.props.addReview(data, this.props.product._id);
	};

	render() {
		const { product, addToCart } = this.props;
		if (!product) return null;
		const { description, imagePath, price, title, reviews } = product;

		let renderReviews = null;

		if (reviews && reviews.length) {
			renderReviews = reviews.map(review => (
				<Comment>
					<Comment.Content>
						<Comment.Author>{review.author}</Comment.Author>
						<Comment.Metadata>
							<div>
								{weekDayFormat(
									new Date(review.date).getUTCDay()
								)}
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
			));
		}
		return (
			<Page
				id="product"
				title={title}
				description={description}
				image={imagePath}
			>
				<div>
					<h1>{title}</h1>
					<div>Price: {price}</div>
					<Button
						onClick={() => {
							addToCart(product._id);
						}}
						basic
						color="green"
					>
						Add to Cart
					</Button>
					<img src={imagePath} alt={title} />
					<div>{description}</div>
					<section>Reviews ({reviews.length})</section>
					{renderReviews ? (
						<Comment.Group>{renderReviews}</Comment.Group>
					) : null}
					<div>Add Review</div>
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
						<Rating
							icon="star"
							rating={this.state.rating}
							maxRating={5}
							onRate={this.handleRate}
						/>
						<button type="submit">Send</button>
					</form>
				</div>
			</Page>
		);
	}
}
const mapStateToProps = state => ({
	product: state.market.product,
});

const mapDispatchToProps = dispatch =>
	bindActionCreators(
		{ getProduct, addToCart: addToCartProduct, addReview },
		dispatch
	);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(
	frontloadConnect(frontload, {
		onMount: true,
		onUpdate: false,
	})(Category)
);
