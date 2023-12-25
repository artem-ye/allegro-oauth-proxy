const Fastify = require('fastify');

const server = async ({ port = 3000, routes = {}, enableLogging = false }) => {
	const fastify = Fastify({
		logger: enableLogging,
	});

	fastify.register(require('@fastify/formbody'));

	for (const { router, options } of Object.values(routes)) {
		fastify.register(router, options);
	}

	return fastify.listen({ port });
};

module.exports = server;
