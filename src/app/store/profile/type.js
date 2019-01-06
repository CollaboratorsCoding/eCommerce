const ProfileTypes = {};

ProfileTypes.getProfile = ['GET_PROFILE'];

ProfileTypes.signIn = ['SIGNIN', 'SIGNIN_SUCCESS', 'SIGNIN_FAIL'];

ProfileTypes.signUp = ['SIGNUP', 'SIGNUP_SUCCESS', 'SIGNUP_FAIL'];
ProfileTypes.logout = ['LOGOUT', 'LOGOUT_SUCCESS', 'LOGOUT_FAIL'];

export default ProfileTypes;
