const express = require('express');
const auth = require("../../../utils/authentication");

const router = express.Router();

const controller = require("./usersController");

router.post("/register",controller.registerUser);
router.post("/login",auth.canAuthenticate,controller.loginUser);

router.put("/addFinishedGame",auth.isAuthenticated,controller.addFinishedGame);
router.put("/addPlayingGame",controller.addPlayingGame);
router.put("/addBacklogGame",controller.addBacklogGame);
router.get('/posts/:username/', controller.getPostsForUser);

router.get('/getUser/:username', controller.getUserByUsername);
router.get("/games/:username",controller.getGames);

router.delete("/removeFinishedGame",auth.isAuthenticated,controller.removeFinishedGame);
router.delete("/removePlayingGame",auth.isAuthenticated,controller.removePlayingGame);
router.delete("/removeBacklogGame",auth.isAuthenticated,controller.removeBacklogGame);

router.put("/addPost",auth.isAuthenticated,controller.addPost);
router.delete("/removePost",auth.isAuthenticated,controller.removePost);



module.exports = router;

