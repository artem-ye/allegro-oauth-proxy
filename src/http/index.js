const server = require('./server.js');
const config = require('../../config');
const routes = require('./routes');

const PORT = config.http.port;
const LOGGING = config.http.logging;
const ADDRESS = config.http.address;

module.exports = async () =>
	server({
		address: ADDRESS,
		port: PORT,
		enableLogging: LOGGING,
		routes: routes,
	});
