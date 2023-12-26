const { parseAuthHeader, authorize } = require('./auth');

const routes = [
	// request new token pair
	{
		method: 'POST',
		url: '/device',
		schema: {
			querystring: {
				type: 'object',
				properties: {
					client_id: { type: 'string' },
				},
				required: ['client_id'],
			},
		},
		handler: async (request, reply) => {
			const params = request.query;
			return { oauth: 'POST REQUEST DEVICE TOKEN', params };
		},
	},
	// retrieve/refresh tokens pair
	{
		method: 'POST',
		url: '/token',
		schema: {
			querystring: {
				type: 'object',
				properties: {
					grant_type: { type: 'string' },
					// retrieve params
					device_code: { type: 'string' },
					// refresh params
					refresh_token: { type: 'string' },
					redirect_uri: { type: 'string' },
				},
				required: ['grant_type'],
			},
		},
		handler: async (request, reply) => {
			const params = request.query;
			return { oauth: 'POST RETRIEVE TOKENS', params };
		},
	},
	// get cached tokens
	{
		method: 'GET',
		url: '/token',
		handler: async (request, reply) => {
			const params = request.query;
			return { oauth: 'GET DEVICE', params };
		},
	},
];

async function authPreHandler(req, res) {
	const credentials = parseAuthHeader(req.headers.authorization);
	if (!credentials) {
		return res.code(403).send({ error: 'Forbidden', credentials });
	}

	if (!(await authorize(credentials))) {
		return res.code(403).send({ error: 'Forbidden', credentials });
	}

	req.user = credentials.client_id;
}

async function oauthRouter(fastify, options) {
	fastify.decorateRequest('user', '');
	fastify.addHook('preHandler', authPreHandler);

	for (const route of routes) {
		fastify.route(route);
	}
}

module.exports = oauthRouter;
