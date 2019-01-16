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
const [ADD_REPLY] = types.addReply;
const [GET_REVIEWS] = types.getReviews;
const [ADD_REVIEW_RATE] = types.addReviewRate;

const initialState = {
	loading: false,
	loadingCart: false,
	error: {},
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
			const newCategories = {};
			action.result.categories.forEach(cat => {
				newCategories[cat.slug] = {
					...cat,
					...state.categories[cat.slug],
					products: _.get(state, `categories[${cat.slug}]`, null)
						? state.categories[cat.slug].products
						: {
								'1': [],
						  },
				};
			});
			return {
				...state,
				categories: {
					...newCategories,
				},
			};
		}

		case GET_PRODUCTS: {
			return {
				...state,
				loading: true,
				error: {},
			};
		}

		case `${GET_PRODUCTS}_FAILURE`: {
			return {
				...state,
				loading: false,
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
				loading: false,
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

		case GET_PRODUCT: {
			return {
				...state,
				loading: true,
			};
		}
		case `${GET_PRODUCT}_SUCCESS`: {
			return {
				...state,
				loading: false,
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

		case `${ADD_REPLY}_SUCCESS`: {
			const newReviews = _.mapValues(state.product.reviews, val => {
				const reviewIndex = val.findIndex(
					r => r._id === action.result.reply.parentReviewId
				);

				if (reviewIndex !== -1) {
					const newVal = [...val];

					newVal[reviewIndex].replies = [
						action.result.reply,
						...newVal[reviewIndex].replies,
					];
					return [...newVal];
				}
				return val;
			});
			return {
				...state,
				product: {
					...state.product,
					reviews: newReviews,
				},
			};
		}
		case `${GET_REVIEWS}_SUCCESS`: {
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
		case `${ADD_REVIEW_RATE}_SUCCESS`: {
			const { result } = action;
			const { review } = result;

			const newReviews = _.mapValues(state.product.reviews, val => {
				const newVal = [...val];

				const reviewIndex = newVal.findIndex(
					rev => rev._id === review._id
				);

				if (reviewIndex !== -1) {
					newVal[reviewIndex] = review;
					return [...newVal];
				}
				return newVal;
			});

			return {
				...state,
				product: {
					...state.product,
					reviews: newReviews,
				},
			};
		}

		case `${GET_CART}_SUCCESS`:
			return {
				...state,
				cart: action.result.cart,
			};
		case ADD_TO_CART_PRODUCT:
			return {
				...state,
				loadingCart: true,
			};
		case `${ADD_TO_CART_PRODUCT}_SUCCESS`:
			return {
				...state,
				cart: action.result.cart,
				loadingCart: false,
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
