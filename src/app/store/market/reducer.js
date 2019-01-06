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
		case `${GET_CATEGORIES}_SUCCESS`: {
			const categories = {};
			action.result.categories.forEach(cat => {
				categories[cat.slug] = {
					...cat,
					products: {
						'1': [],
					},
				};
			});
			return {
				...state,
				categories,
			};
		}

		case `${GET_PRODUCTS}_SUCCESS`: {
			const { result } = action;
			const {
				page,
				products,
				category,
				productsCount,
				filtersData,
				filtersExisting,
				filteredDocsCount,
			} = result;
			const oldProducts = _.get(
				state,
				`categories[${category}].products`,
				{}
			);
			const newProducts = {
				...oldProducts,
				[page]: products,
			};
			return {
				...state,
				categories: {
					...state.categories,
					[category]: {
						...state.categories[category],
						products: newProducts,
						productsCount,
						filtersData,
						filtersExisting,
						filteredDocsCount,
					},
				},
			};
		}

		case `${GET_PRODUCT}_SUCCESS`: {
			return {
				...state,
				product: { ...state.product, ...action.result.product },
			};
		}
		case `${ADD_REVIEW}_SUCCESS`: {
			let prevLastItem;
			const newReviews = _.mapValues(
				state.product.reviews,
				(val, key) => {
					let newVal = [...val];

					newVal.unshift(
						key === '1' ? action.result.review : prevLastItem
					);
					if (newVal.length > 9) {
						prevLastItem = newVal[newVal.length - 1];
						newVal = newVal.slice(0, -1);
					}
					return newVal;
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
