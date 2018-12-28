import React from 'react';
import { Grid, Segment } from 'semantic-ui-react';
import { Product } from '../../routes';
import CustomLink from '../../hocs/customLink';

export default function ProductsList({ products }) {
	if (!products.length) return null;

	const productsList = products.map(product => (
		<Grid.Column key={product.title}>
			<CustomLink
				componentPromise={Product}
				className="category-item"
				to={`/p/${product.slug}`}
			>
				<Segment>{product.title}</Segment>
			</CustomLink>
		</Grid.Column>
	));
	return (
		<Grid stackable columns={4}>
			{productsList}
		</Grid>
	);
}
