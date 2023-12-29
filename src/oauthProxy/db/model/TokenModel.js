const mongoose = require('mongoose');

const TokenSchema = mongoose.Schema({
	user_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Users',
		unique: true,
		index: 1,
		required: true,
	},
	token: { type: String, required: true },
	refresh_token: { type: String, required: true },
	created: Date,
	expires: Date,
});

const TokenModel = mongoose.model('Tokens', TokenSchema);
module.exports = TokenModel;
