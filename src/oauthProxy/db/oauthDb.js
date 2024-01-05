const UserModel = require('./model/UserModel');

const oauthDb = {
	userExists: async ({ client_id, client_secret }) =>
		UserModel.exists({ client_id, client_secret }),

	createUser: async ({ client_id, client_secret }) =>
		UserModel.create({ client_id, client_secret }),

	getTokens: async ({ client_id, client_secret }) => {
		return UserModel({ client_id, client_secret }).getTokens();
	},

	saveTokens: async ({
		client_id,
		client_secret,
		access_token,
		refresh_token,
		expires_in,
	}) => {
		return UserModel({ client_id, client_secret }).saveTokens({
			access_token,
			refresh_token,
			expires_in,
		});
	},
};

module.exports = oauthDb;
