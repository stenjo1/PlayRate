const express = require('express');

const router = express.Router();

const controller = require("./usersController");

router.post("/register",controller.registerUser);
//router.post("/login",controler.login)

module.exports = router;

