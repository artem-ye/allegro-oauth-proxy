const parseAuthorization = (authorization) => {
	if (!authorization) return;
	if (!typeof authorization === 'string') return false;
	if (!authorization.startsWith('Basic')) return false;

	const credentials = authorization.split(' ')[1];
	if (!credentials) return false;

	const [client_id, client_secret] = credentials.split(':');
	return {
		client_id,
		client_secret,
	};
};

const authorize = async ({ client_id, client_secret }) => {
	if (client_id === 'key' && client_secret === 'val') {
		return true;
	}

	return false;
};

const authPreHandler = async (req, res) => {
	const credentials = parseAuthorization(req.headers.authorization);
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
