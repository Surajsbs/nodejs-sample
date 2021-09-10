const express = require('express');
const router = express.Router();

const UserController = require("./controller.js");


router.post("/postuser", UserController.insertUser);

router.get("/userlist", UserController.myUserList);

router.patch("/updateuer", UserController.updateUser);

router.delete("/deleteuser", UserController.deleteUser);

module.exports = router;