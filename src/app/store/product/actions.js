// // import cartTypes from './type';
// import createActionThunk from '../actionThunk';

// import request from 'superagent';
const ProductActions = {};

ProductActions.getCategories = () => ({
	types: ['GET_CATEGORIES', 'GET_CATEGORIES_SUCCESS', 'GET_CATEGORIES_FAIL'],
	promise: client => client.get('get-categories'),
});

ProductActions.getProducts = category => ({
	types: ['GET_PRODUCTS', 'GET_PRODUCTS_SUCCESS', 'GET_PRODUCTS_FAIL'],
	promise: client => client.get(`get-products?c=${category}`),
});
export default ProductActions;
