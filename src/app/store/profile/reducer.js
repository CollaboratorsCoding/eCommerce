import _ from 'lodash';
import types from './type';

const [GET_PROFILE] = types.getProfile;

const [SIGNIN] = types.signIn;

const [SIGNUP] = types.signUp;

const [LOGOUT] = types.logout;

const [RESTORE_PASSWORD] = types.RestorePassword;



const initialState = {
	isLoggedIn: false,
	profile: {},
	error: {},
	loading: false,
	userLoading: true,
	lastVisitedProducts: [],
};

export default (state = initialState, action) => {
	switch (action.type) {
	case GET_PROFILE:
		return {
			...state,
			error: {},
		};

	case `${GET_PROFILE}_SUCCESS`: {
		return {
			...state,
			profile: _.get(action.result, 'user', {}),
			isLoggedIn: _.get(action.result, 'isLoggedIn', true),
			lastVisitedProducts: _.get(
				action.result,
				'lastVisitedProducts',
				[]
			),
			userLoading: false,
			error: {},
		};
	}

	case `${GET_PROFILE}_FAILURE`:
		return {
			...state,
			loading: false,
		};

	case SIGNIN:
		return {
			...state,
			loading: true,
			error: {},
		};
	case `${SIGNIN}_SUCCESS`:
		return {
			...state,
			profile: _.get(action.result, 'user', {}),
			loading: false,
			isLoggedIn: _.get(action.result, 'isLoggedIn', true),
			error: {},
		};
	case `${SIGNIN}_FAILURE`: {
		return {
			...state,
			error: {
				type: _.get(action.error, 'error.type', 'server'),
				message: _.get(
					action.error,
					'error.message',
					'Oops... Something went wrong 😔'
				),
				fieldName: _.get(action.error, 'error.fieldName', ''),
			},
			loading: false,
		};
	}

	case SIGNUP:
		return {
			...state,
			loading: true,
			error: {},
		};
	case `${SIGNUP}_SUCCESS`:
		return {
			...state,
			profile: _.get(action.result, 'user', {}),
			loading: false,
			isLoggedIn: _.get(action.result, 'isLoggedIn', true),
			error: {},
		};
	case `${SIGNUP}_FAILURE`:
		return {
			...state,
			error: {
				type: _.get(action.error, 'error.type', 'server'),
				message: _.get(
					action.error,
					'error.message',
					'Oops... Something went wrong 😔'
				),
				fieldName: _.get(action.error, 'error.fieldName', ''),
			},
			loading: false,
		};

	case LOGOUT:
		return {
			...state,
			loading: true,
			error: {},
		};
	case `${LOGOUT}_SUCCESS`:
		return {
			...state,
			loading: false,
			profile: {},
			isLoggedIn: _.get(action.result, 'isLoggedIn', false),
			error: {},
		};
	case `${LOGOUT}_FAILURE`:
		return {
			...state,
			error: {
				type: _.get(action.error, 'error.type', 'server'),
				message: _.get(
					action.error,
					'error.message',
					'Oops... Something went wrong 😔'
				),
				fieldName: _.get(action.error, 'error.fieldName', ''),
			},
			loading: false,
		};

	case RESTORE_PASSWORD:
		return {
			...state,
			loading: true,
			requestSuccess: {},
			error: {},
		};

	case `${RESTORE_PASSWORD}_SUCCESS`:
		return {
			...state,
			loading: false,
			requestSuccess: _.get(action.payload, 'data.requestSuccess', {
				operation: 'generic',
				message: 'Success. Operation Completed',
			}),
			error: {},
		};

	case `${RESTORE_PASSWORD}_FAILURE`: {
		return {
			...state,
			error: {
				type: _.get(action.error, 'error.type', 'server'),
				message: _.get(
					action.error,
					'error.message',
					'Oops... Something went wrong 😔'
				),
				fieldName: _.get(action.error, 'error.fieldName', ''),
			},
			loading: false,
		};
	}
	default:
		return state;
	}
};
