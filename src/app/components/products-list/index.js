import React from 'react';

import ProductCard from '../product-card';

export default function ProductsList({ products, addToCart, loadingCart }) {
	if (!products.length) return null;

	const productsList = products.map(product => (
		<ProductCard
			key={product._id}
			product={product}
			addToCart={addToCart}
			loadingCart={loadingCart}
		/>
	));
	return <div className="product-list-wrapper">{productsList}</div>;
}
