const config = require('../../../config');
const OauthProxy = require('../../../src/oauthProxy/core/oauthProxy');
const { db, close, models } = require('../../../src/oauthProxy/db/db');

const MONGO_URL = config.mongo.url;
const EXISTING_CLIENT_ID = 'f050f76ed4ba4f47acd43733b0e882c0';

const existingUser = async () => {
	return models.User.findOne({
		client_id: EXISTING_CLIENT_ID,
	});
};

const testUserData = {
	client_id: 'test_user_oauth_proxy_test',
	client_secret: 'test_pass',
};

beforeAll(async () => {
	await db(MONGO_URL);
	await models.User.deleteOne(testUserData);
});

afterAll(async () => {
	await models.User.deleteOne(testUserData);
	await close();
});

// describe('OauthProxy users', () => {
// 	it('createUser', async () => {
// 		await OauthProxy.createUser(testUserData);
// 		const res = await models.User.findOne(testUserData);
// 		expect(res.client_id).toEqual(testUserData.client_id);
// 	});

// 	it('authorizedUser', async () => {
// 		const unauthorized = await OauthProxy.authorizedUser({
// 			client_id: '',
// 			client_secret: '',
// 		});
// 		expect(unauthorized).toEqual(false);

// 		const { client_id, client_secret } = await existingUser();
// 		const authorized = await OauthProxy.authorizedUser({
// 			client_id,
// 			client_secret,
// 		});
// 		expect(authorized).toEqual(true);
// 	});
// });

test('OauthProxy request tokens', async () => {
	const { client_id, client_secret } = await existingUser();
	const res = await OauthProxy.requestTokens({
		client_id,
		client_secret,
	}).catch((err) => expect('err').toEqual(err));

	expect(res.user_code).not.toBeUndefined();
});
