var redis = require("redis");
var redisClient = redis.createClient();
var session = require('express-session');
var redisStore = require('connect-redis')(session);
const SESSION_SECRET = 'ThisIsHowYouUseRedisSessionStorage';
const SESSION_NAME = '_redisSessionPractice';

// init redis client
redisClient.monitor(function (err, res) {
	console.log("Entering monitoring mode.");
});

redisClient.on('error', (err) => {
	console.log('Redis error: ', err);
});

redisClient.on("monitor", function (time, args, raw_reply) {
	console.log(time + ": " + args);
});

module.exports.getRedisStore = function () {
	return new redisStore({host: 'localhost', port: 6379, client: redisClient, ttl: 300});
};

module.exports.getSession = function() {
	return session({
		secret: SESSION_SECRET,
		name: SESSION_NAME,
		resave: false,
		saveUninitialized: true,
		cookie: {secure: false}, // Note that the cookie-parser module is no longer needed
		// create new redis store.
		store: this.getRedisStore()
	})
};