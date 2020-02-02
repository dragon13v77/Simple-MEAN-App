var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports.register = function (req, res) {
	const username = req.query.username;
	const password = req.query.password;


	var response = {
		status: 200,
		message: {
			user: null,
			message: '',
			registered: true
		}
	};

	res
		.status(response.status)
		.json(response.message);
};

module.exports.checkUnique = function (req, res) {
	console.log('DATA .....................................', req.body.field, req.body.value);

	const field = req.body.field;
	const username = req.body.value;



	var response = {
		status: 200,
		message: {
			isUnique: true
		}
	};

	if (!username) {
		response.status = 500;
		response.message.isUnique = false;
	}
	else {
		User
			.findOne({UserName: username})
			.exec(function(err, user) {
				if (err) {
					response.status = 500;
					response.message.isUnique = false;
				}
				else if (!user) {
					console.log('USER NOT FOUND -> IS UNIQUE', username);
				}
				else {
					response.message.isUnique = false;
					console.log('USER FOUND -> NOT UNIQUE', username);
				}

				res
					.status(response.status)
					.json(response.message);
			});
	}
};