require('dotenv').config();

const config = {
	http: {
		address: process.env.HTTP_ADDRESS || 'localhost',
		port: process.env.HTTP_PORT || 3000,
		logging: process.env.HTTP_LOGGING || false,
		uri_prefix: process.env.URI_PREFIX || '',
	},
	mongo: {
		url: process.env.MONGO_URL,
	},
	api: {
		root_token: process.env.ROOT_TOKEN,
	},
};

module.exports = config;
