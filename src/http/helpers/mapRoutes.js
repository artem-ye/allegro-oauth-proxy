const mapRoutes = (routes, options = {}) => {
	// convert  default module.exports
	const exportedRoutes = typeof routes === 'object' ? routes : { routes };

	return Object.values(exportedRoutes).map((router) => ({
		router,
		options,
	}));
};

module.exports = mapRoutes;
