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
	metaData: true,
});

ProfileActions.signin = data => ({
	types: types.signIn,
	promise: client => client.post('signin', { data }),
	metaData: true,
});

ProfileActions.signup = data => ({
	types: types.signUp,
	promise: client => client.post('signup', { data }),
	metaData: true,
});

ProfileActions.sendResetLinkEmail = data => ({
	types: types.RestorePassword,
	promise: client => client.post('sendresetPassword', { data }),
	metaData: true,
});

ProfileActions.actionResetPassword = (data, token) => ({
	types: types.RestorePassword,
	promise: client => client.post(`resetpassword?token=${token}`, { data }),
	metaData: true,
});

export default ProfileActions;
