const { db, close, models } = require('../../../src/oauthProxy/db/db');
const { User: UserModel, Token: TokenModel } = models;

const notThrows = (err) => expect(err).toBe('error');

test('db not throws', async () => {
	try {
		await db();
	} catch (err) {
		expect(err).toBe('error');
	}
});

describe('db models', () => {
	const deleteMock = async () => {
		await UserModel.deleteOne({ client_id: 'foo' });
		await TokenModel.deleteOne({ token: 'token' });
	};
	beforeEach(deleteMock);
	afterEach(deleteMock);

	test('db UserModel works', async () => {
		const user = await models.User.create({
			client_id: 'foo',
			client_secret: 'bar',
		}).catch(notThrows);

		// duplicated records throws
		await models.User.create({
			client_id: 'foo',
			client_secret: 'bar',
		}).catch((err) => expect(err).not.toBe(undefined));
	});

	test('db TokenModel works', async () => {
		const user = await models.User.create({
			client_id: 'foo',
			client_secret: 'bar',
		}).catch(notThrows);

		await TokenModel.create({
			user_id: user._id,
			token: 'token',
			refresh_token: 'refresh_token',
		}).catch(notThrows);

		// duplicated records
		await TokenModel.create({
			user_id: user._id,
			token: 'token',
			refresh_token: 'refresh_token',
		}).catch((err) => expect(err).not.toBeNull());
	});
});

afterAll(async () => await close());
