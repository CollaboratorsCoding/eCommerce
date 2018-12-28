import React from 'react';
import { Icon } from 'semantic-ui-react';

export default function CartEmpty() {
	return (
		<div className="containerEmptyCart">
			<div className="cart-wrapper">
				<div className="cart">
					<Icon size="massive" name="shopping basket" />
				</div>
				<div className="shadow" />
				<h1>Your shopping basket is empty</h1>
			</div>
		</div>
	);
}
