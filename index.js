const server = require('./src/http/');

server()
	.then((msg) => console.log(`HTTP server started: ${msg}`))
	.catch((err) => {
		console.error(err);
		process.exit(1);
	});
