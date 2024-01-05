const AllegroOauthClient = require('../../src/oauthProxy/core/allegroOauthClient');

const client_id = 'foo';
const client_secret = 'bar';

const client = new AllegroOauthClient({
	client_id,
	client_secret,
});

test('AllegroOauthClient:constructor', () => {
	expect(client instanceof AllegroOauthClient).toBe(true);
});

test('AllegroOauthClient:requestTokens', async () => {
	const res = await client.requestTokens({ client_id });
	expect(res.status).toBe(401);
});
