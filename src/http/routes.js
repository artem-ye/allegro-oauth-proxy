const appRoutes = require('../staticPages/routes');
const oauthRoutes = require('../oauthProxy/router');

const adaptRoutes = (routes, options = {}) => {
	const reducer = (acc, [key, router]) =>
		Object.assign(acc, {
			[key]: {
				router,
				options,
			},
		});

	// named | default module.exports
	const exportedRoutes = typeof routes === 'object' ? routes : { routes };
	return Object.entries(exportedRoutes).reduce(reducer, {});
};

const routes = {};
Object.assign(routes, adaptRoutes(appRoutes));
Object.assign(routes, adaptRoutes(oauthRoutes, { prefix: 'oauth' }));
module.exports = routes;
