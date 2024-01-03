const config = require('../../../config');
const { db, close, models } = require('../../../src/oauthProxy/db/db');
const { User: UserModel, Token: TokenModel } = models;

const CONN_STR = config.mongo.url + '_Test';

const testUser = {
	client_id: 'foo',
	client_secret: 'bar',
};

const testToken = {
	token: 'token',
	refresh_token: 'refresh_token',
	expires: 1000,
};

beforeAll(async () => {
	await db(CONN_STR);
	await models.User.deleteMany(testUser);
	await models.Token.deleteMany({ token: testToken.token });

	await models.User.create(testUser);
});

afterAll(async () => {
	await models.Token.deleteMany({ token: testToken.token });
	await models.User.deleteMany(testUser);
	await close();
});

describe('db user model | saveTokens/getTokens', () => {
	test('saveToken/getTokens works', async () => {
		const user = models.User(testUser);

		// saveToken: works
		await user
			.saveTokens(testToken)
			.catch((err) => expect(err).toBe('error'));

		const updatedToken = await models.Token.findOne({
			user_id: user._id,
		});
		expect(updatedToken).not.toBeFalsy();
		expect(updatedToken.user_id).toEqual(user._id);

		// Can update existing token
		const res = await user
			.saveTokens(testToken)
			.catch((err) => expect(err).toBe('error'));

		// getTokens: works
		const userToken = await user.getTokens();
		expect(userToken).not.toBeNull();
		expect(userToken.user_id).toEqual(user._id);
	});

	test('saveToken: save unknown user token throws', async () => {
		const usr = models.User({
			client_id: 'not',
			client_secret: 'exists',
		});
		await usr
			.saveTokens({
				token: 'token',
				refresh_token: 'refresh_token',
			})
			.catch((err) => expect(err).not.toBeNull());
	});
});
