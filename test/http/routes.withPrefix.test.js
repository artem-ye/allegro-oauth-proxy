const URL_PREFIX = '/foo';
process.env.URI_PREFIX = URL_PREFIX;

const config = require('../../config');
const Fastify = require('fastify');
const routes = require('../../src/http/routes');

test('env prefix sets to config', () => {
	expect(config.http.uri_prefix === URL_PREFIX).toBeTruthy();
});

test('routes without prefix works', async () => {
	const app = Fastify({});
	for (const { router, options } of routes) {
		app.register(router, options);
	}
	await app.ready();

	app.inject({ method: 'GET', url: URL_PREFIX }).then((res) => {
		expect(res.statusCode).toBe(200);
		expect(JSON.parse(res.body)).toEqual({ hello: 'world!!!' });
	});

	await app.close();
});
