import React from 'react';
import { Grid, Card, Image, Button } from 'semantic-ui-react';
import { Product } from '../../routes';
import CustomLink from '../../hocs/customLink';

export default function ProductsList({ products, addToCart }) {
	if (!products.length) return null;

	const productsList = products.map(product => (
		<Grid.Column key={product._id}>
			<Card>
				<Image src={product.imagePath} />
				<Card.Content>
					<Card.Header>
						<CustomLink
							componentPromise={Product}
							className="category-item"
							to={`/p/${product.slug}?tab=description`}
						>
							{product.title}{' '}
						</CustomLink>
					</Card.Header>

					<Card.Description>{product.description}</Card.Description>
				</Card.Content>
				<Card.Content extra>
					{product.price}
					<Button
						onClick={() => {
							addToCart(product._id);
						}}
						basic
						color="green"
					>
						Add to Cart
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
