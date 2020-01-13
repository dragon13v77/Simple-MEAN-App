var mongoose = require('mongoose');
var Tutorial = mongoose.model('Tutorial');

module.exports.tutorialsGetAll = function (req, res) {

	var offset = 0;
	var count = 5;
	var maxCount = 10;

	if (req.query && req.query.offset) {
		offset = parseInt(req.query.offset, 10);
	}

	if (req.query && req.query.count) {
		count = parseInt(req.query.count, 10);
	}

	if (isNaN(offset) || isNaN(count)) {
		res
			.status(400)
			.json({"message": "Count and offset should be numbers"});
		return;
	}

	if (count > maxCount) {
		res
			.status(400)
			.json({"message": "Count limit of " + maxCount + " exceeded"});
		return;
	}

	Tutorial
		.find()
		.limit(count)
		.skip(offset)
		.exec(function (err, tutorials) {
			if (err) {
				res
					.status(500)
					.json(err);
			}
			else {
				console.log('Found tutorials ', tutorials.length);
				res
					.json(tutorials);
			}
		});
};

module.exports.tutorialsGetOne = function (req, res) {
	const tutorialId = req.params.tutorialId;
	console.log('GET tutorial by ID', tutorialId);

	Tutorial
		.findById(tutorialId)
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
				response.message = {"message": "Tutorial ID not found"};
			}

			res
				.status(response.status)
				.json(response.message);

		});
};