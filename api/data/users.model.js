var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
	FirstName: {
		type: String,
		required: false
	},
	LastName: {
		type: String,
		required: false
	},
	UserName: {
		type: String,
		required: true
	},
	Password: {
		type: String,
		required: true
	},
	Email: {
		type: String,
		required: false
	}
});

mongoose.model('User', userSchema, 'Users');