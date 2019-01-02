// import cartTypes from './type';

const initialState = {
	categories: {},
	products: [],
	product: {},
	cart: {},
};

export default (state = initialState, action) => {
	switch (action.type) {
		case 'GET_CATEGORIES_SUCCESS':
			return {
				...state,
				categories: action.result.categories,
			};
		case 'GET_PRODUCTS_SUCCESS': {
			return {
				...state,
				products: action.result.products,
			};
		}

		case 'GET_PRODUCT_SUCCESS': {
			// TODO: reviews
			return {
				...state,
				product: { ...state.product, ...action.result.product },
			};
		}
		case 'ADD_REVIEW_SUCCESS': {
			return {
				...state,
				product: {
					...state.product,
					reviews: [action.result.review, ...state.product.reviews],
				},
			};
		}

		case 'GET_REVIEWS_SUCCESS': {
			// TODO: reviews
			const { result } = action;
			const { page, reviews } = result;

			const product = {
				...state.product,
				reviews: {
					...state.product.reviews,
					[page]: reviews,
				},
			};

			return {
				...state,
				product,
			};
		}
		case 'GET_CART_SUCCESS':
			return {
				...state,
				cart: action.result.cart,
			};
		case 'ADD_TO_CART_PRODUCT_SUCCESS':
			return {
				...state,
				cart: action.result.cart,
			};
		case 'REMOVE_CART_PRODUCT_SUCCESS':
			return {
				...state,
				cart: action.result.cart,
			};
		case 'REDUCE_CART_PRODUCT_SUCCESS':
			return {
				...state,
				cart: action.result.cart,
			};
		default:
			return state;
	}
};
