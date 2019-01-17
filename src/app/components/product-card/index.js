import React from 'react';
import { Card, Image, Button, Rating, Loader } from 'semantic-ui-react';
import { Product } from '../../routes';
import CustomLink from '../../hocs/customLink';
import './index.scss';

export default function ProductCard({ product, addToCart, loadingCart }) {
	if (!product) return null;
	const tagsColors = {
		'Hot Product': 'red',
		'Great Deal': 'orange',
	};
	return (
		<Card centered className="card-product">
			<Card.Content>
				<Card.Header>
					<div className="product-tags">
						{product.tags.map(tag => (
							<span
								className={`tag tag-${tag}`}
								style={{
									backgroundColor: tagsColors[tag],
								}}
							>
								{tag}
							</span>
						))}
					</div>

					<Image className="card-image" src={product.imagePath} />

					<CustomLink
						componentPromise={Product}
						className="product-card-title"
						to={`/p/${product.slug}?tab=description`}
					>
						{product.title}{' '}
					</CustomLink>
				</Card.Header>

				<Card.Description className="product-card-description">
					{product.description}
				</Card.Description>
			</Card.Content>

			<Card.Content extra>
				<div className="product-extra">
					<div className="product-price">${product.price}</div>
					<div className="product-rating">
						<Rating
							icon="star"
							rating={
								product.rating
									? product.rating / product.votes
									: 0
							}
							maxRating={5}
							disabled
						/>
						<div className="product-reviews">
							({product.votes || 0})
						</div>
					</div>
				</div>

				<Button
					onClick={() => {
						addToCart(product._id);
					}}
					color="teal"
					className="product-buy"
					fluid
					disabled={loadingCart}
				>
					Add to Cart
					<Loader active={loadingCart} inline />
				</Button>
			</Card.Content>
		</Card>
	);
}
