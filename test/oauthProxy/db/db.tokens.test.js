const { db, close, models } = require('../../../src/oauthProxy/db/db');
const { User: UserModel, Token: TokenModel } = models;

beforeAll(async () => await db());
afterAll(async () => await close());

describe('db user model | saveTokens/getTokens', () => {
	const testUser = {
		client_id: 'foo',
		client_secret: 'bar',
	};

	beforeAll(async () => await models.User.create(testUser));
	afterAll(async () => {
		await models.User.deleteOne(testUser);
		await models.Token.deleteMany({ token: 'token' });
	});

	test('saveToken works', async () => {
		const usr = models.User(testUser);

		// saveToken: works
		await usr
			.saveTokens({
				token: 'token',
				refresh_token: 'refresh_token',
				expires: 1000,
			})
			.catch((err) => expect(err).toBe('error'));

		// saveToken: tokens override without error
		const res = await usr
			.saveTokens({
				token: 'token',
				refresh_token: 'refresh_token',
				expires: 1000,
			})
			.catch((err) => expect(err).toBe('error'));

		const { user_id } = await models.User.find(testUser);
		const updatedToken = await models.Token.find({ user_id });
		expect(updatedToken).not.toBeFalsy();
		expect(updatedToken.user_id).toEqual(user_id);

		// getTokens: works
		const userToken = await models.User({ _id: usr._id }).getTokens();
		expect(userToken).not.toBeNull();
		expect(userToken.user_id).toEqual(usr._id);
	});

	test('saveToken: save unknown user token throws', async () => {
		const usr = models.User({
			client_id: 'not',
			client_secret: 'exists',
		});
		const res = await usr
			.saveTokens({
				token: 'token',
				refresh_token: 'refresh_token',
			})
			.catch((err) => expect(err).not.toBeNull());
	});
});
