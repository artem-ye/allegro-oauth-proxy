const mongo_url =
	process.env.mongo_url ||
	`mongodb://localhost:27017/Tokens` + process.env.NODE_ENV !== 'production'
		? 'Test'
		: '';

const config = {
	http: {
		port: process.env.http_port || 3000,
	},
	mongo: {
		url: process.env.MONGO_URL || `mongodb://localhost:27017/Tokens`,
	},
};

module.exports = config;
