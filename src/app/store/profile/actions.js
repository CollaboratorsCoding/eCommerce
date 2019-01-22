import types from './type';
// import createActionThunk from '../actionThunk';

// import request from 'superagent';

const ProfileActions = {};

ProfileActions.getProfile = () => ({
	types: types.getProfile,
	promise: client => client.get('/profile'),
});

ProfileActions.logout = () => ({
	types: types.logout,
	promise: client => client.get('/logout'),
});

ProfileActions.signin = data => ({
	types: types.signIn,
	promise: client => client.post('signin', { data }),
});

ProfileActions.signup = data => ({
	types: types.signUp,
	promise: client => client.post('signup', { data }),
});

ProfileActions.sendResetLinkEmail = data => ({
	types: types.RestorePassword,
	promise: client => client.post('sendresetPassword', { data }),
	metaData: true,
});

ProfileActions.actionResetPassword = (data, token) => ({
	types: types.RestorePassword,
	promise: client => client.post(`resetpassword?token=${token}`, { data }),
});

export default ProfileActions;
