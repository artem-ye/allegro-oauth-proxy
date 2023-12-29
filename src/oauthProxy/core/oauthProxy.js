const UserModel = require('../db/model/UserModel');
const AllegroOauthClient = require('./allegroOauthClient');

STATUS_OK = 200;

async function authorizedUser({ client_id, client_secret }) {
	const user = await UserModel.findOne({ client_id, client_secret });
	return !!user;
}

async function createUser({ client_id, client_secret }) {
	return UserModel.create({ client_id, client_secret });
}

async function requestToken({ client_id, client_secret }) {
	return AllegroOauthClient.requestToken({ client_id, client_secret });
}

async function retrieveTokens({ client_id, client_secret, device_code }) {
	const res = await AllegroOauthClient.retrieveTokens({
		client_id,
		client_secret,
		device_code,
	});

	if (res?.status === STATUS_OK) {
		// update db data
		const { token, refresh_token, expires } = res.data;
		await UserModel({ client_id, client_secret }).saveTokens({
			token,
			refresh_token,
			expires,
		});
	}

	return res;
}

async function refreshTokens({ client_id, client_secret, refresh_token }) {
	const res = await AllegroOauthClient.refreshTokens({
		client_id,
		client_secret,
		refresh_token,
	});

	if (res?.status === STATUS_OK) {
		// update db data
		const { token, refresh_token, expires } = res.data;
		await UserModel({ client_id, client_secret }).saveTokens({
			token,
			refresh_token,
			expires,
		});
	}

	return res;
}

async function getTokens({ client_id, client_secret }) {
	return UserModel({ client_id, client_secret }).getTokens();
}

const OauthProxy = {
	authorizedUser,
	createUser,
	requestToken,
	retrieveTokens,
	refreshTokens,
	getTokens,
};

module.exports = OauthProxy;
