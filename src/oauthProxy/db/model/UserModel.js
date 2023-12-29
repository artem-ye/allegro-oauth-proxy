const mongoose = require('mongoose');
const TokenModel = require('./TokenModel');

// const TokenModel = mongoose.model('Token');

const UserSchema = new mongoose.Schema({
	client_id: { type: String, required: true, unique: true, dropDups: true },
	client_secret: { type: String, required: true },
});

UserSchema.method({
	saveToken: async function ({ token, refresh_token, expires }) {
		// TokenModel.findOneAndUpdate(
		// 	{
		// 		user_id: this._id,
		// 	},
		// 	{
		// 		token,
		// 		refresh_token,
		// 		// created: Date.now(),
		// 		// expires: Date.now + expires,
		// 	},
		// 	{ upsert: true }
		// );
		await TokenModel.findOneAndUpdate(
			{
				user_id: this._id,
			},
			{
				user_id: this._id,
				token,
				refresh_token,
				// created: Date.now(),
				// expires: Date.now + expires,
			},
			{ upsert: true }
		);
	},
	getToken: async function () {
		return TokenModel.findOne({ user_id: this._id });
	},
});

// animalSchema.methods.findSimilarTypes = function (cb) {
// 	return mongoose.model('Animal').find({ type: this.type }, cb);
// };

const UserModel = mongoose.model('Users', UserSchema);
module.exports = UserModel;
