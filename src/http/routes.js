const appRoutes = require('../staticPages/routes');
const oauthRoutes = require('../oauthProxy/api/router');
const oauthAdminRouter = require('../oauthProxy/adminApi/router');

const adaptRoutes = (routes, options = {}) => {
	const reducer = (acc, [key, router]) => acc.concat({ router, options });

	// named | default module.exports
	const exportedRoutes = typeof routes === 'object' ? routes : { routes };
	return Object.entries(exportedRoutes).reduce(reducer, []);
};

const routes = [];
routes.push(...adaptRoutes(appRoutes));
routes.push(...adaptRoutes(oauthRoutes, { prefix: 'oauth' }));
routes.push(...adaptRoutes(oauthAdminRouter, { prefix: 'oauth/user' }));

module.exports = routes;
