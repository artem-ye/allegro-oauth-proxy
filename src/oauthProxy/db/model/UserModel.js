const mongoose = require('mongoose');
const TokenModel = require('./TokenModel');

const UserSchema = new mongoose.Schema({
	client_id: { type: String, required: true, unique: true, index: true },
	client_secret: { type: String, required: true },
});

UserSchema.method({
	_getId: async function () {
		if (!this.$isNew) {
			return this._id;
		}

		const data = this.toObject({ minimize: true });
		delete data._id;

		if (Object.keys(data).length) {
			const user = await UserModel.findOne(data);
			return user && user._id;
		}

		return null;
	},
	saveTokens: async function ({ access_token, refresh_token, expires_in }) {
		const _id = await this._getId();
		if (!_id) return null;

		return await TokenModel.findOneAndUpdate(
			{
				user_id: _id,
			},
			{
				user_id: _id,
				access_token,
				refresh_token,
				created: Date.now(),
				expires: Date.now() + parseInt(expires_in) * 1000,
			},
			{ upsert: true, new: true }
		);
	},
	getTokens: async function () {
		const _id = await this._getId();
		if (!_id) return null;

		return await TokenModel.findOne({ user_id: _id });
	},
});

const UserModel = mongoose.model('Users', UserSchema);
module.exports = UserModel;
