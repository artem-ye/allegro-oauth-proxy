const API_ENDPOINT = 'https://api.allegro.pl';

class AllegroOauthClient {
	constructor({ client_id, client_secret }) {
		this.client_id = client_id;
		this.client_secret = client_secret;
		this.base64_credentials = Buffer.from(
			`${this.client_id}:${this.client_secret}`
		).toString('base64');
	}

	post(path, headers, params) {}

	// async requestTokens() {
	// 	return {
	// 		device_code: 'device_code:request',
	// 		user_code: 'user_code:request',
	// 	};
	// }

	// async retrieveTokens({ client_id, client_secret, device_code }) {
	// 	return {
	// 		device_code: 'device_code:request',
	// 		user_code: 'user_code:request',
	// 	};
	// }

	// async refreshTokens({ client_id, client_secret, refresh_token }) {
	// 	return {
	// 		device_code: 'device_code:request',
	// 		user_code: 'user_code:request',
	// 	};
	// }
}

module.exports = AllegroOauthClient;
