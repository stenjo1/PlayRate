const express = require('express');
const auth = require("../../../utils/authentication");

const router = express.Router();

const controller = require("./usersController");

router.post("/register",controller.registerUser);
router.post("/login",auth.canAuthenticate,controller.loginUser);

module.exports = router;

