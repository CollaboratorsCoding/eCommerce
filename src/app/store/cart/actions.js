// import axios from 'axios';
// // import cartTypes from './type';
// import createActionThunk from '../actionThunk';

const CartActions = {};

CartActions.getCart = () => dispatch =>
	new Promise(resolve => {
		fetch('/api/get-cart').then(response => {
			dispatch({
				type: 'GET_CART',
				cart: response,
			});
			resolve(response);
		});
	});
// new Promise((resolve, reject) =>
// 	fetch('/api/get-cart').then(
// 		response => {
// 			if (response.ok) {
// 				dispatch({
// 					type: 'GET_CART',
// 					cart: response,
// 				});

// 				resolve(response);
// 			} else {
// 				reject(new Error('error'));
// 			}
// 		},
// 		error => {
// 			reject(new Error(error.message));
// 		}
// 	)
// );

export default CartActions;
