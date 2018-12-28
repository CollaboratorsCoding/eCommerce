import _ from 'lodash';
import types from './type';

const [GET_PROFILE, GET_PROFILE_SUCCESS, GET_PROFILE_FAIL] = types.getProfile;

const [SIGNIN, SIGNIN_SUCCESS, SIGNIN_FAIL] = types.signIn;

const [SIGNUP, SIGNUP_SUCCESS, SIGNUP_FAIL] = types.signUp;

const initialState = {
	checkedAuth: false,
	isLoggedIn: false,
	profile: {},
	loadingUserState: true,
	error: {},
	loading: false,
	requestSuccess: {},
};

export default (state = initialState, action) => {
	switch (action.type) {
		case GET_PROFILE:
			return {
				...state,
				error: {},
			};

		case GET_PROFILE_SUCCESS:
			return {
				...state,
				profile: _.get(action.result, 'user', {}),
				loadingUserState: false,
				checkedAuth: true,
				isLoggedIn: _.get(action.result, 'isLoggedIn', true),
				error: {},
			};

		case GET_PROFILE_FAIL:
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
		case SIGNIN_SUCCESS:
			return {
				...state,
				profile: _.get(action.result, 'user', {}),
				loading: false,
				isLoggedIn: _.get(action.result, 'isLoggedIn', true),
				error: {},
			};
		case SIGNIN_FAIL:
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

		case SIGNUP:
			return {
				...state,
				loading: true,
				error: {},
			};
		case SIGNUP_SUCCESS:
			return {
				...state,
				profile: _.get(action.result, 'user', {}),
				loading: false,
				isLoggedIn: _.get(action.result, 'isLoggedIn', true),
				error: {},
			};
		case SIGNUP_FAIL:
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
