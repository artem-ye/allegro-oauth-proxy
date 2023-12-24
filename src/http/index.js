const server = require('./server.js');
const config = require('../../config');
const routes = require('./routes');

const PORT = config.http.port;
const LOGGING = process.env.NODE_ENV === 'development' ? true : false;

module.exports = async () =>
	server({
		port: PORT,
		enableLogging: LOGGING,
		routes: routes,
	});
