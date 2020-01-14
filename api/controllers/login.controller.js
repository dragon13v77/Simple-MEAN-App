var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports.login = function (req, res) {
	const username = req.query.username;
	const password = req.query.password;
	console.log('GET user by username', username);

	User
		.findOne({UserName: username})
		.exec(function (err, user) {

			console.log('USER LOGIN', user);
			var response = {
				status: 200,
				message: {
					user: null,
					message: '',
					loggedIn: false
				}
			};

			if (err) {
				response.status = 500;
				response.message = err;
			}
			else if (!user) {
				response.status = 404;
				response.message.message = "User not found";
			}
			else {

				if (user && user.Password === password) {
					console.log('PASSWORD MATCH');
					response.message = {
						user: {
							firstName: user.FirstName,
							lastName: user.LastName,
							email: user.Email,
							username: user.UserName
						},
						sessId: req.sessionID,
						loggedIn: true,
						message: 'PASSWORD MATCH'
					};
					req.session.isLoggedIn = true;
					req.session.user = user.FirstName + ' ' + user.LastName;
					req.session.username = user.UserName;
				}
				else {
					console.log('PASSWORD MISMATCH');
					response.message.message = 'PASSWORD MISMATCH';
				}
			}

			console.log('LOGGED IN SESSION', req.session);
			console.log('SESSION ID', req.sessionID);

			res
				.status(response.status)
				.json(response.message);

		});
};

module.exports.logout = function (req, res) {
	var response = {
		status: 200,
		message: true
	};

	console.log('LOGOUT | DESTROY SESSION', req.session);
	console.log('SESSION ID', req.sessionID);

	if (req.session.isLoggedIn) {
		req.session.destroy(function (err) {
			if (err) {
				response.status = 500;
				response.message = false;
				console.log(err);
			}
			else {
				console.log('SUCCESSFULLY LOGGED OUT | SESSION DESTROYED');
			}
		});
	}

	res
		.status(response.status)
		.json(response.message);
};

module.exports.checkProfile = function(req, res) {
	var response = {
		status: 200,
		message: null
	};

	if (req.session.username) {
		response.message = {
			username: req.session.username,
			sessId: req.sessionID
		}
	}
	else {
		response.message = null;
	}

	res
		.status(response.status)
		.json(response.message);
};