const initialState = {
	notification: {
		type: '',
		message: {},
		duration: 3.5,
	},
	redirect: {
		path: null,
		timeout: null,
	},
};

export default (state = initialState, { data, type }) => {
	switch (type) {
	case 'SET_METADATA': {
		return {
			...state,
			...data,
		};
	}
	default:
		return state;
	}
};
