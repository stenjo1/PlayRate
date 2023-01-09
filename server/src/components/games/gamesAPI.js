const express = require('express');

const router = express.Router();
const controller = require('./gamesController');

router.get('/', controller.getGamesPagination);
router.get('/reviews/:gameId', controller.getReviewsForGame);
router.get('/all', controller.getAllGames);
router.get('/popular', controller.getPopularGames);
router.get('/:gameId', controller.getGameById);
router.put('/post', controller.attachPost);
router.patch('/update', controller.updateReviewScore);
router.patch("/removepost", controller.removePost);

module.exports = router;