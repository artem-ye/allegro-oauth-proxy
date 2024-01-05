const authHelper = require('./api/auth');
const handlers = require('./api/controller');

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
		handler: handlers.deviceHandler,
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
		handler: handlers.tokensHandler,
	},
	// get cached tokens
	{
		method: 'GET',
		url: '/token',
		handler: handlers.getTokensHandler,
	},
];

async function authPreHandler(req, res) {
	const credentials = authHelper.parseAuthHeader(req.headers.authorization);
	if (!credentials) {
		return res.code(403).send({ error: 'Forbidden', credentials });
	}

	if (!(await authHelper.authorize(credentials))) {
		return res.code(403).send({ error: 'Forbidden', credentials });
	}

	req.client_id = credentials.client_id;
	req.client_secret = credentials.client_secret;
}

async function oauthRouter(fastify, options) {
	fastify.decorateRequest('client_id', '');
	fastify.decorateRequest('client_secret', '');
	fastify.addHook('preHandler', authPreHandler);

	for (const route of routes) {
		fastify.route(route);
	}
}

module.exports = oauthRouter;
