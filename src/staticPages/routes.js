async function homeRoute(fastify) {
	fastify.get('/', async () => {
		return { hello: 'world!!!' };
	});
}

async function aboutRoute(fastify) {
	fastify.get('/about', async () => {
		return { about: 'us' };
	});
}

module.exports = {
	homeRoute,
	aboutRoute,
};
