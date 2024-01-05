const Querystring = require('node:querystring');

const API_ENDPOINT = 'https://allegro.pl/auth/oauth';

const base64credentials = (client_id, client_secret) =>
	Buffer.from(`${client_id}:${client_secret}`).toString('base64');

const oauthTransport = ({
	client_id,
	client_secret,
	api_endpoint = API_ENDPOINT,
}) => {
	const base64_credentials = base64credentials(client_id, client_secret);

	return {
		fetch: async ({ path, headers, queryParams }) => {
			const queryString = queryParams
				? `?${Querystring.stringify(queryParams)}`
				: '';
			const url = `${api_endpoint}${path}${queryString}`;

			const reqHeaders = Object.assign(
				{ ...(headers || {}) },
				{
					'Content-Type': 'application/x-www-form-urlencoded',
					Authorization: `Basic ${base64_credentials}`,
				}
			);

			try {
				const res = await fetch(url, {
					method: 'POST',
					headers: reqHeaders,
				});

				return {
					status: res.status,
					data: await res.json(),
				};
			} catch (err) {
				return {
					error: err instanceof Error ? err.message : err,
				};
			}
		},
	};
};

class AllegroOauthClient {
	constructor({ client_id, client_secret, api_endpoint = API_ENDPOINT }) {
		this.fetch = oauthTransport({
			client_id,
			client_secret,
			api_endpoint,
		}).fetch;
	}

	static withAuth({ client_id, client_secret }) {
		return new AllegroOauthClient({ client_id, client_secret });
	}

	async requestTokens({ client_id }) {
		const fetchProps = {
			path: '/device',
			queryParams: { client_id },
		};

		return this.fetch(fetchProps);
	}

	async retrieveTokens({ device_code }) {
		const fetchProps = {
			path: '/token',
			queryParams: {
				grant_type: 'urn:ietf:params:oauth:grant-type:device_code',
				device_code,
			},
		};

		return this.fetch(fetchProps);
	}

	async refreshTokens({ refresh_token }) {
		const fetchProps = {
			path: '/token',
			queryParams: {
				grant_type: 'refresh_token',
				redirect_uri: 'www.allegro.pl',
				refresh_token,
			},
		};

		return this.fetch(fetchProps);
	}
}

module.exports = AllegroOauthClient;
