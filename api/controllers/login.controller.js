var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports.usersGetOne = function (req, res) {
	const username = req.query.username;
	const password = req.query.password;
	console.log('GET user by username', username);

	User
		.findOne({UserName: username})
		.exec(function (err, doc) {

			var response = {
				status: 200,
				message: doc
			};

			if (err) {
				response.status = 500;
				response.message = err;
			}
			else if (!doc) {
				response.status = 404;
				response.message = {"message": "User not found"};
			}

			if (doc && doc.Password === password) {
				console.log('PASSWORD MATCH');
				response.message = true;
			}
			else {
				console.log('PASSWORD MISMATCH');
				response.message = false;
			}

			res
				.status(response.status)
				.json(response.message);

		});
};

module.exports.usersLogout = function (req, res) {
	var response = {
		status: 200,
		message: true
	};

	res
		.status(response.status)
		.json(response.message);
};