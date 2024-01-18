const Fastify = require('fastify');
const routes = require('../../src/http/routes');

test('routes without prefix works', async () => {
	const app = Fastify({});
	for (const { router, options } of routes) {
		app.register(router, options);
	}
	await app.ready();

	app.inject({ method: 'GET', url: '/' }).then((res) => {
		expect(res.statusCode).toBe(200);
		expect(JSON.parse(res.body)).toEqual({ hello: 'world!!!' });
	});

	await app.close();
});
