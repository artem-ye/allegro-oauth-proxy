const OauthProxy = require('../core/oauthProxy');

async function deviceHandler(req, res) {
	try {
		return await bindCredentials(req, OauthProxy.requestTokens)();
	} catch (err) {
		return sendError(err, res);
	}
}

async function tokensHandler(req, res) {
	const params = req.query;
	const fn =
		params.grant_type === 'refresh_token'
			? OauthProxy.refreshTokens
			: OauthProxy.retrieveTokens;

	try {
		return await bindCredentials(req, fn)(params);
	} catch (err) {
		console.log(err);
		return sendError(err, res);
	}
}

async function getTokensHandler(req, res) {
	try {
		return await bindCredentials(req, OauthProxy.getTokens)();
	} catch (err) {
		return sendError(err, res);
	}
}

// Helpers

const bindCredentials = ({ client_id, client_secret }, fn) => {
	return async (props = {}) => {
		return fn({ client_id, client_secret, ...props });
	};
};

const sendError = (err, res) => {
	res.code(500).send({ error: err?.message || err });
};

module.exports = {
	deviceHandler,
	tokensHandler,
	getTokensHandler,
};
