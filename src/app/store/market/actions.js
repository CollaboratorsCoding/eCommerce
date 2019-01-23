import MarketTypes from './type';
// import createActionThunk from '../actionThunk';

// import request from 'superagent';
const MarketActions = {};

// * CART  START * //
MarketActions.getCart = () => ({
	types: MarketTypes.getCart,
	promise: client => client.get('get-cart'),
});
MarketActions.addToCartProduct = id => ({
	types: MarketTypes.addToCartProduct,
	promise: client => client.get(`/add-cart/${id}`),
	metaData: true,
});

MarketActions.removeCartProduct = id => ({
	types: MarketTypes.removeCartProduct,
	promise: client => client.get(`/remove/${id}`),
	metaData: true,
});

MarketActions.reduceCartProduct = id => ({
	types: MarketTypes.reduceCartProduct,
	promise: client => client.get(`/reduce/${id}`),
	metaData: true,
});

// * CART  END * //

// * CATEGORIES/PRODUCTS  START * //

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

// * CATEGORIES/PRODUCTS  END * //

// * REVIEWS  START * //

MarketActions.addReview = (data, slug) => ({
	types: MarketTypes.addReview,
	promise: client => client.post(`add-review/${slug}`, { data }),
	metaData: true,
});

MarketActions.addReply = data => ({
	types: MarketTypes.addReply,
	promise: client => client.post(`add-reply`, { data }),
	metaData: true,
});

MarketActions.addReviewRate = (id, rate) => ({
	types: MarketTypes.addReviewRate,
	promise: client =>
		client.post(`add-review-rate/${id}`, {
			data: {
				rate,
			},
		}),
	metaData: true,
});

MarketActions.getReviews = (p, l, slug) => ({
	types: MarketTypes.getReviews,
	promise: client => client.get(`get-reviews/${slug}?p=${p}&l=${l}`),
});

// * REVIEWS  END * //

// * ORDERS  START * //
MarketActions.addOrder = data => ({
	types: MarketTypes.addOrder,
	promise: client => client.post(`order`, { data }),
	metaData: true,
});

// * ORDERS  END * //
export default MarketActions;
