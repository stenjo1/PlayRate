const express = require('express');

const router = express.Router();

const controller = require("./usersController");

router.post("/register",controller.registerUser);

module.exports = router;

