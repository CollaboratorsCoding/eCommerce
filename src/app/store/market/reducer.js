import types from './type';

const [GET_CART, GET_CART_SUCCESS, GET_CART_FAIL] = types.getCart;
const [
	ADD_TO_CART_PRODUCT,
	ADD_TO_CART_PRODUCT_SUCCESS,
	ADD_TO_CART_PRODUCT_FAIL,
] = types.addToCartProduct;
const [
	REMOVE_CART_PRODUC,
	REMOVE_CART_PRODUCT_SUCCESS,
	REMOVE_CART_PRODUC_FAIL,
] = types.removeCartProduct;
const [
	REDUCE_CART_PRODUCT,
	REDUCE_CART_PRODUCT_SUCCESS,
	REDUCE_CART_PRODUCT_FAIL,
] = types.reduceCartProduct;

const [
	GET_CATEGORIES,
	GET_CATEGORIES_SUCCESS,
	GET_CATEGORIES_FAIL,
] = types.getCategories;
const [
	GET_PRODUCTS,
	GET_PRODUCTS_SUCCESS,
	GET_PRODUCTS_FAIL,
] = types.getProducts;
const [GET_PRODUCT, GET_PRODUCT_SUCCESS, GET_PRODUCT_FAIL] = types.getProduct;
const [ADD_REVIEW, ADD_REVIEW_SUCCESS, ADD_REVIEW_FAIL] = types.addReview;

const initialState = {
	categories: {},
	products: [],
	product: null,
	cart: {},
};

export default (state = initialState, action) => {
	switch (action.type) {
		case GET_CATEGORIES_SUCCESS:
			return {
				...state,
				categories: action.result.categories,
			};
		case GET_PRODUCTS_SUCCESS: {
			return {
				...state,
				products: action.result.products,
			};
		}

		case GET_PRODUCT_SUCCESS: {
			return {
				...state,
				product: action.result.product,
			};
		}
		case ADD_REVIEW_SUCCESS: {
			return {
				...state,
				product: {
					...state.product,
					reviews: [action.result.review, ...state.product.reviews],
				},
			};
		}
		case GET_CART_SUCCESS:
			return {
				...state,
				cart: action.result.cart,
			};
		case ADD_TO_CART_PRODUCT_SUCCESS:
			return {
				...state,
				cart: action.result.cart,
			};
		case REMOVE_CART_PRODUCT_SUCCESS:
			return {
				...state,
				cart: action.result.cart,
			};
		case REDUCE_CART_PRODUCT_SUCCESS:
			return {
				...state,
				cart: action.result.cart,
			};
		default:
			return state;
	}
};
