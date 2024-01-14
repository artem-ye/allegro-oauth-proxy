const config = require('../../../config');
const { db, close, models } = require('../../../src/oauthProxy/db/db');

const CONN_STR = config.mongo.url + '_Test';

const testUser = {
	client_id: 'foo',
	client_secret: 'bar',
};

const testToken = {
	access_token: 'token',
	refresh_token: 'refresh_token',
	expires_in: 1000,
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
	test('saveTokens works', async () => {
		// saveTokens
		const _user = await models.User.findOne(testUser);
		expect(_user.client_id).toEqual(testUser.client_id);

		let savedToken = await models.User(testUser).saveTokens(testToken);
		expect(savedToken.access_token).toEqual(testToken.access_token);
		expect(savedToken.user_id).toEqual(_user._id);

		let dbToken = await models.Token.findOne({ user_id: _user._id });
		expect(dbToken.user_id).toEqual(_user._id);
		expect(dbToken.access_token).toEqual(testToken.access_token);

		dbToken = await models.Token.find({
			access_token: testToken.access_token,
		});
		expect(dbToken.length).toEqual(1);

		await models.Token.deleteMany(testToken);
		savedToken = await _user.saveTokens(testToken);
		expect(savedToken.access_token).toEqual(testToken.access_token);
		expect(savedToken.user_id).toEqual(_user._id);

		savedToken = await _user.saveTokens(testToken);
		expect(savedToken.access_token).toEqual(testToken.access_token);
		expect(savedToken.user_id).toEqual(_user._id);

		// getTokens
		dbToken = await models.User(testUser).getTokens();
		expect(dbToken.user_id).toEqual(_user._id);
		expect(dbToken.access_token).toEqual(testToken.access_token);

		dbToken = await _user.getTokens();
		expect(dbToken.user_id).toEqual(_user._id);
		expect(dbToken.access_token).toEqual(testToken.access_token);

		dbToken = await models
			.User({
				client_id: 'not',
				client_secret: 'exists',
			})
			.getTokens();
		expect(dbToken).toBeFalsy();
	});
});
