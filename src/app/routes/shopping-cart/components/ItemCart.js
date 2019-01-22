import React from 'react';
import { List, Image, Icon, Label } from 'semantic-ui-react';

export default function ItemCart({
	products,
	handleAddProduct,
	handleRemoveProduct,
	handleReduceProduct,
}) {
	return (
		<List divided relaxed>
			{products.map(product => (
				<List.Item key={product.item._id}>
					<Image
						floated="left"
						size="tiny"
						src={product.item.imagePath}
					/>
					<List.Content floated="left">
						<List.Header className="shopping-cart-section-body-title cut-text">
							{product.item.title}
						</List.Header>
						<List.Description className="shopping-cart-section-body-description cut-text">
							{product.item.description}
						</List.Description>
					</List.Content>
					<List.Content floated="right">
						<div className="shopping-cart-section-body-right">
							<Icon
								className="shopping-cart-section-body-right__icon-delete"
								onClick={() =>
									handleRemoveProduct(product.item._id)
								}
								color="red"
								name="trash alternate outline"
							/>
							<div className="shopping-cart-section-body-right-bottom">
								<Icon
									color="grey"
									onClick={() =>
										handleReduceProduct(product.item._id)
									}
									size="large"
									className="shopping-cart-section-body-right-bottom-arrow"
									name="caret square left"
								/>
								<Label color="teal">{product.qty}</Label>
								<Icon
									color="grey"
									size="large"
									onClick={() =>
										handleAddProduct(product.item._id)
									}
									className="shopping-cart-section-body-right-bottom-arrow"
									name="caret square right"
								/>
								<p>
									<Icon name="usd" />
									{product.price}
								</p>
							</div>
						</div>
					</List.Content>
				</List.Item>
			))}
		</List>
	);
}
