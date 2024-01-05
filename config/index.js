require('dotenv').config();

const config = {
	http: {
		port: process.env.HTTP_PORT || 3000,
	},
	mongo: {
		url: process.env.MONGO_URL,
	},
	api: {
		root_token: process.env.ROOT_TOKEN,
	},
};

module.exports = config;
