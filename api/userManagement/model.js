const mongoose = require('mongoose');

const usersSchema = mongoose.Schema({
	_id  			: mongoose.Schema.Types.ObjectId,
	firstName 	: String,
	lastName 	: String,
	email 		: String,
	phone 		: String,
	city 			: String,
	pincode 		: Number, 
	createdAt   : Date, 
});

module.exports = mongoose.model("users", usersSchema);
