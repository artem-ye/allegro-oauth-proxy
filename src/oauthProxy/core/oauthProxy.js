const AllegroOauthClient = require('./allegroOauthClient');
const oauthDb = require('../db/oauthDb');

const STATUS_OK = 200;

async function requestTokens({ client_id, client_secret }) {
	const res = await AllegroOauthClient.withAuth({
		client_id,
		client_secret,
	}).requestTokens({ client_id });

	if (res?.status === STATUS_OK) {
		return res.data;
	}

	return { error: res };
}

async function retrieveTokens({ client_id, client_secret, device_code }) {
	const credentials = { client_id, client_secret };

	const res = await AllegroOauthClient.withAuth(credentials).retrieveTokens({
		device_code,
	});

	if (res?.status === STATUS_OK) {
		const { access_token, refresh_token, expires_in } = res.data;

		const dbRecord = await oauthDb.saveTokens({
			...credentials,
			access_token,
			refresh_token,
			expires_in,
		});
		if (!dbRecord) throw new Error('DB Error: Unable to store tokens');

		return res.data;
	}

	return { error: res };
}

async function refreshTokens({ client_id, client_secret, refresh_token }) {
	const credentials = { client_id, client_secret };
	const res = await AllegroOauthClient.withAuth(credentials).refreshTokens({
		refresh_token,
	});

	if (res?.status === STATUS_OK) {
		const { access_token, refresh_token, expires_in } = res.data;

		const dbRecord = await oauthDb.saveTokens({
			...credentials,
			access_token,
			refresh_token,
			expires_in,
		});
		if (!dbRecord) throw new Error('DB Error: Unable to store tokens');

		return res.data;
	}

	return { error: res };
}

async function getTokens({ client_id, client_secret }) {
	const tokens = await oauthDb.getTokens({ client_id, client_secret });
	return tokens && tokens.toViewObject();
}

const OauthProxy = {
	requestTokens,
	retrieveTokens,
	refreshTokens,
	getTokens,
};

module.exports = OauthProxy;
