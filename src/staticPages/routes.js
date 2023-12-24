async function homeRoute(fastify, options) {
	fastify.get('/', async (request, reply) => {
		return { hello: 'world!!!' };
	});
}

async function aboutRoute(fastify, options) {
	fastify.get('/about', async (request, reply) => {
		return { about: 'us' };
	});
}

module.exports = {
	homeRoute,
	aboutRoute,
};
