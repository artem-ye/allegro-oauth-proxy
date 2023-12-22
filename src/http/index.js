const Fastify = require('fastify');
const config = require('../../config');
const routes = require('./routes');
const oauthRouter = require('../oauthApi/router');

const PORT = config.http.port;

const fastify = Fastify({
	logger: process.env.NODE_ENV === 'development' ? true : false,
});

for (const route of Object.values(routes)) {
	fastify.register(route);
}

fastify.register(oauthRouter, { prefix: 'oauth' });

const server = async () => {
	return fastify.listen({ port: 3000 });
};

module.exports = server;
