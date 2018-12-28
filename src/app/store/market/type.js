const MarketTypes = {};

MarketTypes.getCart = ['GET_CART', 'GET_CART_SUCCESS', 'GET_CART_FAIL'];
MarketTypes.addToCartProduct = [
	'ADD_TO_CART_PRODUCT',
	'ADD_TO_CART_PRODUCT_SUCCESS',
	'ADD_TO_CART_PRODUCT_FAIL',
];
MarketTypes.removeCartProduct = [
	'REMOVE_CART_PRODUCT',
	'REMOVE_CART_PRODUCT_SUCCESS',
	'REMOVE_CART_PRODUCT_FAIL',
];
MarketTypes.reduceCartProduct = [
	'REDUCE_CART_PRODUCT',
	'REDUCE_CART_PRODUCT_SUCCESS',
	'REDUCE_CART_PRODUCT_FAIL',
];

MarketTypes.getCategories = [
	'GET_CATEGORIES',
	'GET_CATEGORIES_SUCCESS',
	'GET_CATEGORIES_FAIL',
];
MarketTypes.getProducts = [
	'GET_PRODUCTS',
	'GET_PRODUCTS_SUCCESS',
	'GET_PRODUCTS_FAIL',
];
MarketTypes.getProduct = [
	'GET_PRODUCT',
	'GET_PRODUCT_SUCCESS',
	'GET_PRODUCT_FAIL',
];
MarketTypes.addReview = ['ADD_REVIEW', 'ADD_REVIEW_SUCCESS', 'ADD_REVIEW_FAIL'];

export default MarketTypes;
