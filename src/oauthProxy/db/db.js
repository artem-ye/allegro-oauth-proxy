const mongoose = require('mongoose');
const models = require('./model/');
const config = require('../../../config');

async function db(connStr) {
	const connectionString = connStr || config.mongo.url;
	return await mongoose
		.connect(connectionString, { serverSelectionTimeoutMS: 500 })
		.then((conn) => {
			const { host, port, name } = conn.connection;
			console.log(`DB Connected: mongodb://${host}:${port}/${name}`);
		});
}

module.exports = {
	db,
	models,
	close: () => mongoose.disconnect(),
};
