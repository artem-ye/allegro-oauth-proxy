const AllegroOauthClient = require('../../../src/oauthProxy/core/allegroOauthClient');

const client_id = '123';
const client_secret = '456';

const client = new AllegroOauthClient({
	client_id,
	client_secret,
});

test('AllegroOauthClient:constructor', () => {
	expect(client instanceof AllegroOauthClient).toBe(true);
	expect(client.base64_credentials).toBe(
		Buffer.from(`${client_id}:${client_secret}`).toString('base64')
	);
});
