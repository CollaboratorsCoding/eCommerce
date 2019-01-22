import React from 'react';
import { List, Image } from 'semantic-ui-react';

export default function ProductList({ cart }) {
	const { totalPrice, productsInCart } = cart;
	return (
		<List divided verticalAlign="middle">
			{productsInCart.map(product => (
				<List.Item key={product.item._id}>
					<List.Content floated="right">
						<p>${product.price}</p>
					</List.Content>
					<Image size="tiny" src={product.item.imagePath} />
					<List.Content>
						<span style={{ color: '#659be0' }}>
							{product.item.title}
						</span>
						<p>{product.qty} qty.</p>
					</List.Content>
				</List.Item>
			))}

			<List.Item>
				<List.Content floated="right">
					<List.Header>${totalPrice}</List.Header>
				</List.Content>
				<List.Content>Total price:</List.Content>
			</List.Item>
		</List>
	);
}
