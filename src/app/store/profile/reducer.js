// import cartTypes from './type';

const initialState = {
	profile: {},
};

export default (state = initialState, action) => {
	switch (action.type) {
		case 'SIGNIN_SUCCESS':
			return {
				...state,
				profile: action.result,
			};
		default:
			return state;
	}
};
