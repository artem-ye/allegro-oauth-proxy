const { default: mongoose } = require('mongoose');
const config = require('../../../config');
const { db, close, models } = require('../../../src/oauthProxy/db/db');
const { User: UserModel, Token: TokenModel } = models;

const CONN_STR = config.mongo.url + '_Test';

test('db not throws', async () => {
	let mongo;

	try {
		mongo = await db(CONN_STR);
	} catch (err) {
		expect(err).toBe('error');
	}
});

describe('db models', () => {
	const CLIENT_ID = 'test_user';
	const TOKEN = 'test_token';

	const deleteMock = async () => {
		await UserModel.deleteOne({ client_id: CLIENT_ID });
		await TokenModel.deleteOne({ token: TOKEN });
	};
	beforeEach(deleteMock);
	afterEach(deleteMock);

	test('db UserModel works', async () => {
		const user = await models.User.create({
			client_id: CLIENT_ID,
			client_secret: 'bar',
		}).catch((err) => expect(err).toBe('error'));

		// duplicated records throws
		await models.User.create({
			client_id: CLIENT_ID,
			client_secret: 'bar',
		}).catch((err) => expect(err).not.toBe(undefined));
	});

	test('db TokenModel works', async () => {
		const user = await models.User.create({
			client_id: CLIENT_ID,
			client_secret: 'bar',
		}).catch((err) => expect(err).toBe('error'));

		await TokenModel.create({
			user_id: user._id,
			access_token: TOKEN,
			refresh_token: 'refresh_token',
		}).catch((err) => expect(err).toBe('error'));

		// duplicated records
		await TokenModel.create({
			user_id: user._id,
			token: TOKEN,
			refresh_token: 'refresh_token',
		}).catch((err) => expect(err).not.toBeNull());
	});
});

afterAll(async () => await close());
