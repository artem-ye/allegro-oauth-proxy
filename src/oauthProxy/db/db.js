const mongoose = require('mongoose');
const models = require('./model/');
const config = require('../../../config');

async function db() {
	const connectionString = config.mongo.url;
	return await mongoose.connect(connectionString);
}

module.exports = {
	db,
	models,
	close: () => mongoose.disconnect(),
};
