import _ from 'lodash';
import types from './type';

const [GET_PROFILE] = types.getProfile;

const [SIGNIN] = types.signIn;

const [SIGNUP] = types.signUp;

const [LOGOUT] = types.logout;

const initialState = {
	isLoggedIn: false,
	profile: {},
	error: {},
	loading: false,
};

export default (state = initialState, action) => {
	switch (action.type) {
		case GET_PROFILE:
			return {
				...state,
				error: {},
			};

		case `${GET_PROFILE}_SUCCESS`:
			return {
				...state,
				profile: _.get(action.result, 'user', {}),
				isLoggedIn: _.get(action.result, 'isLoggedIn', true),
				error: {},
			};

		case `${GET_PROFILE}_FAIL`:
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
		case `${SIGNIN}_FAIL`:
			return {
				...state,
				error: {
					type: _.get(action, 'error.type', 'server'),
					message: _.get(
						action,
						'error.message',
						'Oops... Something went wrong 😔'
					),
					formData: _.get(action, 'error.formData', {}),
				},
				loading: false,
			};

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
		case `${SIGNUP}_FAIL`:
			return {
				...state,
				error: {
					type: _.get(action, 'error.type', 'server'),
					message: _.get(
						action,
						'error.message',
						'Oops... Something went wrong 😔'
					),
					formData: _.get(action, 'error.formData', {}),
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
				isLoggedIn: _.get(action.result, 'isLoggedIn', false),
				error: {},
			};
		case `${LOGOUT}_FAIL`:
			return {
				...state,
				error: {
					type: _.get(action.result, 'response.data.type', 'server'),
					message: _.get(
						action.result,
						'response.data.message',
						'Oops... Something went wrong 😔'
					),
					formData: _.get(
						action.result,
						'response.data.formData',
						{}
					),
				},
				loading: false,
			};
		default:
			return state;
	}
};
