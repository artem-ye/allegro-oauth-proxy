const Fastify = require('fastify');
const config = require('../../config');
const routes = require('./routes');

const PORT = config.http.port;

const fastify = Fastify({
	logger: process.env.NODE_ENV === 'development' ? true : false,
});

for (const { router, options } of Object.values(routes)) {
	fastify.register(router, options);
}

const server = async () => {
	return fastify.listen({ port: 3000 });
};

module.exports = server;
