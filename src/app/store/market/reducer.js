import _ from 'lodash';
import types from './type';

const [GET_CART] = types.getCart;
const [ADD_TO_CART_PRODUCT] = types.addToCartProduct;
const [REMOVE_CART_PRODUCT] = types.removeCartProduct;
const [REDUCE_CART_PRODUCT] = types.reduceCartProduct;

const [GET_CATEGORIES] = types.getCategories;
const [GET_PRODUCTS] = types.getProducts;
const [GET_PRODUCT] = types.getProduct;
const [ADD_REVIEW] = types.addReview;
const [GET_REVIEWS] = types.getReviews;

const initialState = {
	categories: {},
	products: [],
	product: {
		reviews: {
			'1': [],
		},
		reviewsCount: 0,
	},
	cart: {},
};

export default (state = initialState, action) => {
	switch (action.type) {
		case `${GET_CATEGORIES}_SUCCESS`:
			return {
				...state,
				categories: action.result.categories,
			};
		case `${GET_PRODUCTS}_SUCCESS`: {
			return {
				...state,
				products: action.result.products,
			};
		}

		case `${GET_PRODUCT}_SUCCESS`: {
			return {
				...state,
				product: { ...state.product, ...action.result.product },
			};
		}
		case `${ADD_REVIEW}_SUCCESS`: {
			let lastItem;
			const newReviews = _.mapValues(
				state.product.reviews,
				(val, key) => {
					lastItem = val[val.length - 1];
					val.unshift(key === '1' ? action.result.review : lastItem);
					if (val.length > 10) {
						val.pop();
					}
					return val;
				}
			);

			return {
				...state,
				product: {
					...state.product,
					reviews: newReviews,
					reviewsCount: state.product.reviewsCount + 1,
				},
			};
		}
		case `${GET_REVIEWS}_SUCCESS`: {
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
		case `${GET_CART}_SUCCESS`:
			return {
				...state,
				cart: action.result.cart,
			};
		case `${ADD_TO_CART_PRODUCT}_SUCCESS`:
			return {
				...state,
				cart: action.result.cart,
			};
		case `${REMOVE_CART_PRODUCT}_SUCCESS`:
			return {
				...state,
				cart: action.result.cart,
			};
		case `${REDUCE_CART_PRODUCT}_SUCCESS`:
			return {
				...state,
				cart: action.result.cart,
			};
		default:
			return state;
	}
};
