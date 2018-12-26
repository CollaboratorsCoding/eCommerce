// // import cartTypes from './type';
// import createActionThunk from '../actionThunk';

// import request from 'superagent';
const MarketActions = {};

MarketActions.getCart = () => ({
	types: ['GET_CART', 'GET_CART_SUCCESS', 'GET_CART_FAIL'],
	promise: client => client.get('get-cart'),
});
MarketActions.addToCartProduct = id => ({
	types: [
		'ADD_TO_CART_PRODUCT',
		'ADD_TO_CART_PRODUCT_SUCCESS',
		'ADD_TO_CART_PRODUCT_FAIL',
	],
	promise: client => client.get(`/add-cart/${id}`),
});

MarketActions.getCategories = () => ({
	types: ['GET_CATEGORIES', 'GET_CATEGORIES_SUCCESS', 'GET_CATEGORIES_FAIL'],
	promise: client => client.get('get-categories'),
});

MarketActions.getProducts = category => ({
	types: ['GET_PRODUCTS', 'GET_PRODUCTS_SUCCESS', 'GET_PRODUCTS_FAIL'],
	promise: client => client.get(`get-products?c=${category}`),
});

MarketActions.getProduct = slug => ({
	types: ['GET_PRODUCT', 'GET_PRODUCT_SUCCESS', 'GET_PRODUCT_FAIL'],
	promise: client => client.get(`get-product?p=${slug}`),
});
export default MarketActions;
