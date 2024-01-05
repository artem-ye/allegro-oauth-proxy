const UserModel = require('../db/model/UserModel');

const findUser = async (params) => {
	const user = await UserModel.findOne(params);
	if (!user) {
		throw new Error(`User not exists: ${JSON.stringify({ ...params })}`);
	}
	return user;
};

// const user = async () => {
// 	const dbUser = await UserModel.findOne(params);

//     if (dbUser) return dbUser;

//     return new Proxy({}, )
// 	const notFound = () => new Error('User not found');

// 	return {
// 		saveTokens: !u ? notFound : u.saveTokens,
// 		saveTokens: !u ? notFound : u.saveTokens,
// 	};
// };

const oauthDb = {
	userExists: async ({ client_id, client_secret }) =>
		UserModel.exists({ client_id, client_secret }),

	createUser: async ({ client_id, client_secret }) =>
		UserModel.create({ client_id, client_secret }),

	getTokens: async ({ client_id, client_secret }) => {
		const user = await findUser({ client_id, client_secret });
		return user.getTokens();
	},

	saveTokens: async ({
		client_id,
		client_secret,
		access_token,
		refresh_token,
		expires_in,
	}) => {
		const user = await findUser({ client_id, client_secret });
		return user.saveTokens({
			access_token,
			refresh_token,
			expires_in,
		});
	},
};

module.exports = oauthDb;
