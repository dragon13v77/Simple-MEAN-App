var mongoose = require('mongoose');
const dburl = 'mongodb://localhost:27017';
const dbname = 'SimpleAppDB';

const remoteDbUrl = "mongodb+srv://rikicare:gRnR1305977850028*@rikicare-vue0a.gcp.mongodb.net/" + dbname + "?retryWrites=true&w=majority";
const remoteOptions = {
	useNewUrlParser: true,
	useUnifiedTopology: true
};

const CONNECTION_TYPE_LOCAL = 'local';
const CONNECTION_TYPE_REMOTE = 'remote';
var connectionType = CONNECTION_TYPE_LOCAL;

if (connectionType == CONNECTION_TYPE_REMOTE) {
	mongoose.connect(remoteDbUrl, remoteOptions, function (error) {
		console.log('ERROR', error);
	});
}
if (connectionType == CONNECTION_TYPE_LOCAL) {
	mongoose.connect(dburl, {
		dbName: dbname
	});
}

mongoose.connection.on('connected', function () {
	console.log('Mnogoose connected to ' + connectionType);
});

mongoose.connection.on('disconnected', function () {
	console.log('Mnogoose disconnected');
});

mongoose.connection.on('error', function (err) {
	console.log('Mnogoose connection error' + err);
});

process.on('SIGINT', function () {
	mongoose.connection.close(function () {
		console.log('Mongoose disconnected through app termination');
		process.exit(0);
	});
});

process.on('SIGTERM', function () {
	mongoose.connection.close(function () {
		console.log('Mongoose disconnected through app termination');
		process.exit(0);
	});
});

process.once('SIGUSR2', function () {
	mongoose.connection.close(function () {
		console.log('Mongoose disconnected through app termination');
		process.kill(process.pid, 'SIGUSR2');
	});
});

// Bring in schema and models
require('./tutorials.models');
require('./users.model');