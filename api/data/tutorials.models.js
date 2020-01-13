var mongoose = require('mongoose');

var usedTechnologiesSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	link: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: false
	}
});

var tutorialSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: false
	},
	githubUrl: {
		type: String,
		required: true
	},
	dateCreated: {
		type: Date,
		"default": Date.now
	},
	usedTechnologies: {
		type: [usedTechnologiesSchema]
	}
});

mongoose.model('Tutorial', tutorialSchema, 'Tutorials');