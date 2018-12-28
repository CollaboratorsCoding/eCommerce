import types from './type';
// import createActionThunk from '../actionThunk';

// import request from 'superagent';

const ProfileActions = {};

ProfileActions.getProfile = () => ({
	types: types.getProfile,
	promise: client => client.get('/profile'),
});

ProfileActions.signin = data => ({
	types: types.signIn,
	promise: client => client.post('signin', { data }),
});

ProfileActions.signup = data => ({
	types: types.signUp,
	promise: client => client.post('signup', { data }),
});
export default ProfileActions;
