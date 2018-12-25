// import cartTypes from './type';

const initialState = {
	cart: {},
};

export default (state = initialState, action) => {
	switch (action.type) {
		case 'GET_CART_SUCCESS':
			return {
				...state,
				cart: action.result,
			};
		default:
			return state;
	}
};
