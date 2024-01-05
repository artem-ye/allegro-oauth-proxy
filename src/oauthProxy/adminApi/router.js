const handlers = require('./controllers');
const config = require('../../../config');

const routes = [
	{
		method: 'GET',
		url: '/',
		schema: {
			querystring: {
				type: 'object',
			},
		},
		handler: handlers.getUser,
	},
	{
		method: 'POST',
		url: '/',
		schema: {
			body: {
				type: 'object',
				properties: {
					client_id: { type: 'string' },
					client_secret: { type: 'string' },
				},
				required: ['client_id', 'client_secret'],
			},
		},
		handler: handlers.createUser,
	},
];

async function oauthAdminRouter(fastify, options) {
	fastify.addHook('preHandler', async (req, res) => {
		const authToken = req.headers.authorization;
		const rootToken = config.api.root_token;

		if (!rootToken) {
			return res
				.code(403)
				.send({ error: 'Forbidden. Api auth disabled' });
		}

		if (authToken !== rootToken) {
			return res.code(403).send({ error: 'Forbidden' });
		}
	});

	for (const route of routes) {
		fastify.route(route);
	}
}

module.exports = oauthAdminRouter;
