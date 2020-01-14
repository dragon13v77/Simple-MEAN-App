require('./api/data/db.js');
var sessionHandler = require('./api/redis/sessionHandler');
const express = require('express');
const path = require('path');
const routes = require('./api/routes');
const bodyParser = require('body-parser');
const app = express();
const cookieParser = require('cookie-parser');

// set constant in express
app.set('port', 3003);

// start a session
app.use(sessionHandler.getSession());

app.use(function(req, res, next) {
	console.log(req.method, req.url);
	next();
});

// set static resources path
// define subset of routs with first argument `/app`
app.use(express.static(path.join(__dirname, 'app')));
//app.use('/node_modules', express.static(__dirname + '/node_modules'));

// enable parsing of posted forms
app.use(bodyParser.urlencoded({
	extended: false //only need strings and arrays
}));
app.use(bodyParser.json());


// add some routing
app.use('/api', routes);

const server = app.listen(app.get('port'), function() {
	const port = server.address().port;
	console.log('Listening port ' + port);
});