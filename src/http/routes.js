const appRoutes = require('../staticPages/routes');
const oauthRoutes = require('../oauthProxy/api/router');
const oauthAdminRouter = require('../oauthProxy/adminApi/router');

const mapRoutes = (routes, options = {}) => {
	// convert  default module.exports
	const exportedRoutes = typeof routes === 'object' ? routes : { routes };

	return Object.values(exportedRoutes).map((router) => ({
		router,
		options,
	}));
};

const routes = [
	...mapRoutes(appRoutes),
	...mapRoutes(oauthRoutes, { prefix: 'oauth' }),
	...mapRoutes(oauthAdminRouter, { prefix: 'oauth/user' }),
];

module.exports = routes;
