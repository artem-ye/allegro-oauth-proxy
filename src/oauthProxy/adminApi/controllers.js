const UserModel = require('../db/model/UserModel');

const adminApiHandlers = {
	getUser: async function (req) {
		const params = req.query;
		const paramsPersist = !!Object.keys(params).length;

		if (paramsPersist) {
			return await UserModel.findOne(params);
		} else {
			return await UserModel.find({});
		}
	},
	createUser: async function (req) {
		const params = req.body;
		return await UserModel.create(params);
	},
};

module.exports = adminApiHandlers;
