const UserController = {};

UserController.getprofile = (req, res) => {
	res.json({
		user: 'user',
	});
};

module.exports = UserController;
