const mongoose = require('mongoose');

const TokenSchema = mongoose.Schema({
	user_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Users',
		unique: true,
		index: 1,
		required: true,
	},
	access_token: { type: String, required: true },
	refresh_token: { type: String, required: true },
	created: Number,
	expires: Number,
});

TokenSchema.method({
	toViewObject: async function () {
		const { access_token, refresh_token, expires } = this;
		return {
			access_token,
			refresh_token,
			expires_in: parseInt((expires - Date.now()) / 1000),
		};
	},
});

const TokenModel = mongoose.model('Tokens', TokenSchema);
module.exports = TokenModel;
