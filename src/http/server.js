const http = require('http');
const config = require('../../config');
const PORT = config.http.port;

const route = async (routes, { url, method, headers }) => {
	const paramsOffset = url.indexOf('?');
	const path = paramsOffset < 0 ? url : url.substring(0, paramsOffset);
	const handler = routes[path];

	if (!handler) {
		return { error: 'not found' };
	}

	return handler({ url, path, method, headers });
};

const server = (routes) => {
	const serve = route.bind(null, routes);

	const httpServer = http.createServer(async (req, res) => {
		const { url, method, headers } = req;
		const response = await serve({ url, method, headers });

		res.setHeader('Content-Type', 'application/json');
		res.end(JSON.stringify(response));
	});

	return new Promise((resolve, reject) => {
		httpServer.on('listening', () =>
			resolve(`Server listening on port ${PORT}`)
		);
		httpServer.on('error', (err) => reject(err));

		httpServer.listen(PORT);
	});
};

module.exports = server;
