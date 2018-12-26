import MarketTypes from './type';
// import createActionThunk from '../actionThunk';

// import request from 'superagent';
const MarketActions = {};

MarketActions.getCart = () => ({
	types: MarketTypes.getCart,
	promise: client => client.get('get-cart'),
});
MarketActions.addToCartProduct = id => ({
	types: MarketTypes.addToCartProduct,
	promise: client => client.get(`/add-cart/${id}`),
});

MarketActions.removeCartProduct = id => ({
	types: MarketTypes.removeCartProduct,
	promise: client => client.get(`/remove/${id}`),
});

MarketActions.reduceCartProduct = id => ({
	types: MarketTypes.reduceCartProduct,
	promise: client => client.get(`/reduce/${id}`),
});

MarketActions.getCategories = () => ({
	types: MarketTypes.getCategories,
	promise: client => client.get('get-categories'),
});

MarketActions.getProducts = category => ({
	types: MarketTypes.getProducts,
	promise: client => client.get(`get-products?c=${category}`),
});

MarketActions.getProduct = slug => ({
	types: MarketTypes.getProduct,
	promise: client => client.get(`get-product?p=${slug}`),
});
export default MarketActions;
