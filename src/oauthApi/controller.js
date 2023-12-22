const oauthController = async ({ url, path, method, headers }) => {
	return {
		path: 'oauth',
		method,
		url,
		path,
	};
};

module.exports = oauthController;
