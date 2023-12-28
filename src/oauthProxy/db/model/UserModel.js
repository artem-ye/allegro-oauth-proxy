const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
	client_id: { type: String, required: true, unique: true, dropDups: true },
	client_secret: { type: String, required: true },
});

const UserModel = mongoose.model('Users', UserSchema);
module.exports = UserModel;
