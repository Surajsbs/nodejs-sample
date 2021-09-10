const mongoose = require("mongoose");
const Users = require("./model.js");


exports.insertUser = (req, res, next) => {
	console.log("***** Reached inside insertUser Function ******");

	console.log("req.body => ", req.body);

	const user = new Users({
		_id: mongoose.Types.ObjectId(),
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		email: req.body.email,
		phone: req.body.phone,
		city: req.body.city,
		createdAt: new Date(),
	});

	user.save()
		.then((newUser) => {
			console.log("new user => ", newUser);
			res.status(200).json({ userdata: newUser });
		})
		.catch((error) => {
			console.log("error => ", error);
			res.status(500).json({ error: error });
		})

}




exports.myUserList = (req, res, next) => {

	Users.find({})
		.then(userdata => {
			res.status(200).json({ allusers: userdata })
		})
		.catch((error) => {
			console.log("error => ", error);
			res.status(500).json({ error: error });
		})

}

exports.updateUser = (req, res, next) => {
	console.log("body  => ", req.body);
	Users.updateOne(
		{ _id: req.body._id },
		{
			$set: {
				email: req.body.email,
				phone: req.body.phone
			}
		},
		{ multi: false }
	)
		.then((updateData) => {
			console.log(updateData);
			if (updateData.modifiedCount === 1) {
				res.status(200).json({ "msg": "User updated successfully." });
			} else {
				res.status(500).json({ "msg": "Unable to update the user." });
			}


		})
		.catch((error) => {
			console.log("error => ", error);
			res.status(200).json({ error: error });
		})
}


exports.deleteUser = (req, res, next) => {
	console.log("body  => ", req.body);
	Users.remove(
		{ _id: req.body._id },
		{ multi: false }
	)
		.then((deletedUser) => {
			console.log(deletedUser);
			if (deletedUser.deletedCount === 1) {
				res.status(200).json({ "msg": "User deleted successfully." });
			} else {
				res.status(500).json({ "msg": "Unable to delete the user." });
			}
		})
		.catch((error) => {
			console.log("error => ", error);
			res.status(500).json({ error: error });
		})
}