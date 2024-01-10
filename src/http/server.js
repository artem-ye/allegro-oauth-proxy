const Fastify = require('fastify');

const server = async ({
	port = 3000,
	address = 'localhost',
	routes = [],
	enableLogging = false,
}) => {
	const fastify = Fastify({
		logger: enableLogging,
	});

	fastify.register(require('@fastify/formbody'));

	for (const { router, options } of routes) {
		fastify.register(router, options);
	}

	return fastify.listen({ port, host: address });
};

module.exports = server;
