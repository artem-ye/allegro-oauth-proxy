const mongoose = require('mongoose');
const TokenModel = require('./TokenModel');

const UserSchema = new mongoose.Schema({
	client_id: { type: String, required: true, unique: true, index: true },
	client_secret: { type: String, required: true },
});

UserSchema.method({
	saveTokens: async function ({ token, refresh_token, expires }) {
		await TokenModel.findOneAndUpdate(
			{
				user_id: this._id,
			},
			{
				user_id: this._id,
				token,
				refresh_token,
				created: Date.now(),
				expires: Date.now() + expires,
			},
			{ upsert: true }
		);
	},
	getTokens: async function () {
		return TokenModel.findOne({ user_id: this._id });
	},
});

const UserModel = mongoose.model('Users', UserSchema);
module.exports = UserModel;
