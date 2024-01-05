const routes = [
	{
		method: 'GET',
		url: '/',
		schema: {
			querystring: {
				type: 'object',
			},
		},
		handler: function (request, reply) {
			reply.send({
				admin: 'route',
				method: request.method,
				params: request.query,
			});
		},
	},
	{
		method: 'POST',
		url: '/',
		schema: {
			querystring: {
				type: 'object',
				// properties: {
				// 	client_id: { type: 'string' },
				// },
				// required: ['client_id'],
			},
		},
		handler: function (request, reply) {
			reply.send({ admin: 'route', method: request.method });
		},
	},
];

async function oauthAdminRouter(fastify, options) {
	// fastify.decorateRequest('client_id', '');
	// fastify.decorateRequest('client_secret', '');
	// fastify.addHook('preHandler', authPreHandler);

	for (const route of routes) {
		fastify.route(route);
	}
}

module.exports = oauthAdminRouter;
