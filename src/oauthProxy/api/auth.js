const oauthDb = require('../core/oauthDb');

const parseAuthHeader = (authorization) => {
	if (!authorization) return;
	if (!typeof authorization === 'string') return false;
	if (!authorization.startsWith('Basic')) return false;

	const credentials = authorization.split(' ')[1];
	if (!credentials) return false;

	const [client_id, client_secret] = credentials.split(':');
	return {
		client_id,
		client_secret,
	};
};

const authorize = async ({ client_id, client_secret }) => {
	return oauthDb.userExists({ client_id, client_secret });
};

module.exports = {
	parseAuthHeader,
	authorize,
};
