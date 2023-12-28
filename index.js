const server = require('./src/http/');
const { db } = require('./src/oauthProxy/db/db');

db()
	.then(() => console.log('Mongo DB connected'))
	.catch((err) => {
		console.log('DB SERVER ERR', err);
		process.exit(1);
	});

server()
	.then((msg) => console.log(`HTTP server started: ${msg}`))
	.catch((err) => {
		console.error('HTTP SERVER ERR', err);
		process.exit(1);
	});
