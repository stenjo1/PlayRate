const express = require('express');
const auth = require("../../../utils/authentication");

const router = express.Router();

const controller = require("./usersController");

router.post("/register",controller.registerUser);
router.post("/login",auth.canAuthenticate,controller.loginUser);

router.patch("/setImgUrl",auth.isAuthenticated,controller.setImgUrl)
router.put("/addFinishedGame",auth.isAuthenticated,controller.addFinishedGame);
router.put("/addPlayingGame",auth.isAuthenticated,controller.addPlayingGame);
router.put("/addBacklogGame",auth.isAuthenticated,controller.addBacklogGame);
router.put("/addReviewedGame",auth.isAuthenticated,controller.addReviewedGame);

router.get('/posts/:username/', controller.getPostsForUser);
router.get('/getUser/:username', controller.getUserByUsername);
router.get('/getUser/:userId', controller.getUserById);
router.get("/getFinishedGames/:username",controller.getFinishedGames);
router.get("/getPlayingGames/:username",controller.getPlayingGames);
router.get("/getBacklogGames/:username",controller.getBacklogGames);
router.get("/getReviewedGames/:username",controller.getReviewedGames);


router.delete("/removeFinishedGame",auth.isAuthenticated,controller.removeFinishedGame);
router.delete("/removePlayingGame",auth.isAuthenticated,controller.removePlayingGame);
router.delete("/removeBacklogGame",auth.isAuthenticated,controller.removeBacklogGame);
router.delete("/removeReviewedGame",auth.isAuthenticated,controller.removeReviewedGame);

router.put("/addPost",auth.isAuthenticated,controller.addPost);
router.delete("/removePost",auth.isAuthenticated,controller.removePost);




module.exports = router;

