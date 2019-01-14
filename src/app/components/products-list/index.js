import React from 'react';
import { Grid, Card, Image, Button, Rating, Loader } from 'semantic-ui-react';
import { Product } from '../../routes';
import CustomLink from '../../hocs/customLink';
import './index.scss';

export default function ProductsList({ products, addToCart, loadingCart }) {
	if (!products.length) return null;

	const productsList = products.map(product => (
		<Grid.Column key={product._id}>
			<Card centered className="card-product">
				<Card.Content>
					<Card.Header>
						<Image className="card-image" src={product.imagePath} />

						<CustomLink
							componentPromise={Product}
							className="category-item"
							to={`/p/${product.slug}?tab=description`}
						>
							{product.title}{' '}
						</CustomLink>
					</Card.Header>

					<Card.Description className="product-card-description">
						Lorem fafafas sfasfas Lorem fafafas sfasfas Lorem
						fafafas sfasfas Lorem fafafas sfasfas Lorem fafafas
						sfasfas Lorem fafafas sfasfas Lorem fafafas sfasfas
						Lorem fafafas sfasfas Lorem fafafas sfasfas Lorem
						fafafas sfasfas Lorem fafafas sfasfas Lorem fafafas
						sfasfas Lorem fafafas sfasfas Lorem fafafas sfasfas
						Lorem fafafas sfasfas Lorem fafafas sfasfas Lorem
						fafafas sfasfas Lorem fafafas sfasfas Lorem fafafas
						sfasfas Lorem fafafas sfasfas Lorem fafafas sfasfas
						Lorem fafafas sfasfas Lorem fafafas sfasfas Lorem
						fafafas sfasfas Lorem fafafas sfasfas Lorem fafafas
						sfasfas Lorem fafafas sfasfas Lorem fafafas sfasfas
						Lorem fafafas sfasfas Lorem fafafas sfasfas Lorem
						fafafas sfasfas Lorem fafafas sfasfas Lorem fafafas
						sfasfas Lorem fafafas sfasfas Lorem fafafas sfasfas
						Lorem fafafas sfasfas Lorem fafafas sfasfas Lorem
						fafafas sfasfas Lorem fafafas sfasfas Lorem fafafas
						sfasfas
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
						color="green"
						className="product-buy"
						fluid
						disabled={loadingCart}
					>
						Add to Cart
						<Loader active={loadingCart} inline />
					</Button>
				</Card.Content>
			</Card>
		</Grid.Column>
	));
	return (
		<Grid stackable columns={4}>
			{productsList}
		</Grid>
	);
}
