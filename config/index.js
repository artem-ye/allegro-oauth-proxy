const config = {
	http: {
		port: process.env.HTTP_PORT || 3000,
	},
	mongo: {
		url: process.env.MONGO_URL,
		test_url: 'mongodb://localhost:27027/Token_Test',
	},
};

module.exports = config;
