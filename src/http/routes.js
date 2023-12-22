const oauthController = require('../oauthApi/controller');

const routes = {
	'/': () => ({
		message: 'It works',
	}),
	'/oauth': (req) => oauthController(req),
};

module.exports = routes;
