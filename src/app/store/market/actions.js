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

MarketActions.getProducts = (p, l, category, filterQuery) => ({
	types: MarketTypes.getProducts,
	promise: client =>
		client.get(
			`get-products/${category}?p=${p}&l=${l}&${filterQuery || ''}`
		),
});

MarketActions.getProduct = slug => ({
	types: MarketTypes.getProduct,
	promise: client => client.get(`get-product/${slug}`),
});

MarketActions.addReview = (data, slug) => ({
	types: MarketTypes.addReview,
	promise: client => client.post(`add-review/${slug}`, { data }),
});

MarketActions.addReply = data => ({
	types: MarketTypes.addReply,
	promise: client => client.post(`add-reply`, { data }),
});

MarketActions.getReviews = (p, l, slug) => ({
	types: MarketTypes.getReviews,
	promise: client => client.get(`get-reviews/${slug}?p=${p}&l=${l}`),
});
export default MarketActions;
