// // import cartTypes from './type';
// import createActionThunk from '../actionThunk';

// import request from 'superagent';

const CartActions = {};

CartActions.getCart = () => ({
	types: ['GET_CART', 'GET_CART_SUCCESS', 'GET_CART_FAIL'],
	promise: client => client.get('get-cart'),
});
export default CartActions;
