const config = {
	http: {
		port: process.env.http_port || 3000,
	},
	mongo: {
		url: process.env.mongo_url || `mongodb://localhost:27017/Tokens`,
	},
};

module.exports = config;
