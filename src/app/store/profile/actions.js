// // import cartTypes from './type';
// import createActionThunk from '../actionThunk';

// import request from 'superagent';

const ProfileActions = {};

ProfileActions.signin = data => ({
	types: ['SIGNIN', 'SIGNIN_SUCCESS', 'SIGNIN_FAIL'],
	promise: client => client.post('signin', data),
});

ProfileActions.signup = data => ({
	types: ['SIGNUP', 'SIGNUP_SUCCESS', 'SIGNUP_FAIL'],
	promise: client => client.post('signup', { data }),
});
export default ProfileActions;
