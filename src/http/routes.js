const appRoutes = require('../staticPages/routes');
const oauthRoutes = require('../oauthProxy/api/router');
const oauthAdminRouter = require('../oauthProxy/adminApi/router');

const mapRoutes = require('./helpers/mapRoutes');

const config = require('../../config');
const applyUriPrefix = require('./helpers/applyUriPrefix')(
	config.http.uri_prefix
);

const routes = [
	...mapRoutes(appRoutes),
	...mapRoutes(oauthRoutes, { prefix: '/oauth' }),
	...mapRoutes(oauthAdminRouter, { prefix: '/oauth/user' }),
].map(applyUriPrefix);

module.exports = routes;
