require('dotenv').config();

const config = {
	http: {
		port: process.env.HTTP_PORT || 3000,
	},
	mongo: {
		url: process.env.MONGO_URL,
	},
};

module.exports = config;
