// import cartTypes from './type';

const initialState = {
	categories: {},
	products: [],
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

		default:
			return state;
	}
};
