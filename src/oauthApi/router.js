const { parseAuthHeader, authorize } = require('./auth');

const authPreHandler = async (req, res) => {
	const credentials = parseAuthHeader(req.headers.authorization);
	if (!credentials) {
		return res.code(403).send({ error: 'Forbidden', credentials });
	}

	if (!(await authorize(credentials))) {
		return res.code(403).send({ error: 'Forbidden', credentials });
	}

	req.user = credentials.client_id;
};

async function oauthRouter(fastify, options) {
	fastify.decorateRequest('user', '');
	fastify.addHook('preHandler', authPreHandler);

	fastify.post('/device', async (request, reply) => {
		return { oauth: 'GET DEVICE' };
	});

	fastify.get('/token', async (request, reply) => {
		return { oauth: 'GET TOKEN' };
	});
}

module.exports = oauthRouter;
