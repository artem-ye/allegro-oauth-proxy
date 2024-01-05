const mongoose = require('mongoose');
const TokenModel = require('./TokenModel');

const errorHandler = (err) => {
	throw err;
};

const UserSchema = new mongoose.Schema({
	client_id: { type: String, required: true, unique: true, index: true },
	client_secret: { type: String, required: true },
});

UserSchema.method({
	saveTokens: async function ({ access_token, refresh_token, expires_in }) {
		return await TokenModel.findOneAndUpdate(
			{
				user_id: this._id,
			},
			{
				user_id: this._id,
				access_token,
				refresh_token,
				created: Date.now(),
				expires: Date.now() + parseInt(expires_in) * 1000,
			},
			{ upsert: true, new: true }
		);
	},
	getTokens: async function () {
		return await TokenModel.findOne({ user_id: this._id });
	},
});

const UserModel = mongoose.model('Users', UserSchema);
module.exports = UserModel;
