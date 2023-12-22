const server = require('./src/http/');

server()
	.then((msg) => console.log(msg))
	.catch((err) => {
		console.error(err);
		process.exit(1);
	});
