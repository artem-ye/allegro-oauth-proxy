const config = require('../../../config');
const OauthProxy = require('../../../src/oauthProxy/core/oauthProxy');
const { db, close, models } = require('../../../src/oauthProxy/db/db');

const testUserData = { client_id: 'test_user', client_secret: 'test_pass' };

beforeAll(async () => {
	await db(config.mongo.test_url);
	await models.User.deleteOne(testUserData);
});

afterAll(async () => {
	await models.User.deleteOne(testUserData);
	await close();
});

describe('OauthProxy.js', () => {
	it('createUser', async () => {
		await OauthProxy.createUser(testUserData);
		const res = await models.User.findOne(testUserData);
		expect(res).not.toBeFalsy();
	});

	it('authorizedUser', async () => {
		const res = await OauthProxy.authorizedUser({
			client_id: '',
			client_secret: '',
		});
		expect(res).toEqual(false);

		const res2 = await OauthProxy.authorizedUser(testUserData);
		expect(res2).toEqual(true);
	});
});
