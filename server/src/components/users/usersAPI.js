const express = require('express');
const auth = require("../../../utils/authentication");

const router = express.Router();

const controller = require("./usersController");

router.post("/register",controller.registerUser);
router.post("/login",auth.canAuthenticate,controller.loginUser);

//TOFIX: This is suposed to be api with authentification 
//router.post("/addFinishedGame",auth.isAuthenticated,controller.addFinishedGame);
router.put("/addFinishedGame",controller.addFinishedGame);
router.put("/addPlayingGame",controller.addPlayingGame);
router.put("/addBacklogGame",controller.addBacklogGame);
//TOFIX: This is suposed to be api with authentification 
router.delete("/removeFinishedGame",controller.removeFinishedGame);
router.delete("/removePlayingGame",controller.removePlayingGame);
router.delete("/removeBacklogGame",controller.removeBacklogGame);

//TOFIX: This is suposed to be api with authentification 
router.put("/addPost",controller.addPost);
router.delete("/removePost",controller.removePost);


module.exports = router;

