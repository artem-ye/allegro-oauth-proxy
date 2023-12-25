const { parseAuthHeader, authorize } = require('./auth');

async function oauthRouter(fastify, options) {
	fastify.decorateRequest('user', '');
	fastify.addHook('preHandler', authPreHandler);

	// request new token pair
	fastify.post('/device', async (request, reply) => {
		return { oauth: 'POST REQUEST DEVICE TOKEN' };
	});

	// retrieve/refresh tokens pair
	fastify.post('/token', async (request, reply) => {
		return { oauth: 'POST RETRIEVE TOKENS' };
	});

	// get cached tokens
	fastify.get('/token', async (request, reply) => {
		return { oauth: 'GET DEVICE' };
	});
}

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

module.exports = oauthRouter;
