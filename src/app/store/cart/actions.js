import axios from 'axios';
// // import cartTypes from './type';
// import createActionThunk from '../actionThunk';

// import request from 'superagent';

const CartActions = {};

CartActions.getCart = () => dispatch =>
	new Promise(resolve => {
		axios.get('http://localhost:3000/api/get-cart').then(response => {
			if (response.data) {
				dispatch({
					type: 'GET_CART',
					cart: response.data,
				});

				resolve(response.data);
			}
		});
	});

export default CartActions;
