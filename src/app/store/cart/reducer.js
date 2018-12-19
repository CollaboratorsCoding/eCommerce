// import cartTypes from './type';

const initialState = {
	cart: {},
};

export default (state = initialState, action) => {
	switch (action.type) {
		case 'GET_CART':
			return {
				...state,
				cart: action.cart,
			};
		default:
			return state;
	}
};
