const mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		lowercase: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	log: [{ artist: String, img: String, name: String }],
});

module.exports = mongoose.model("User", userSchema);
