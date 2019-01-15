import React from 'react';
import { Grid } from 'semantic-ui-react';

import ProductCard from '../product-card';

export default function ProductsList({ products, addToCart, loadingCart }) {
	if (!products.length) return null;

	const productsList = products.map(product => (
		<Grid.Column key={product._id}>
			<ProductCard
				product={product}
				addToCart={addToCart}
				loadingCart={loadingCart}
			/>
		</Grid.Column>
	));
	return (
		<Grid stackable columns={4}>
			{productsList}
		</Grid>
	);
}
