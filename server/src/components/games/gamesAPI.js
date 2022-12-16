const express = require('express');

const router = express.Router();
const controller = require('./gamesController');

router.get('/', controller.getGamesPagination);
router.get('/all', controller.getAllGames);
router.get('/:gameId', controller.getGameById);
router.put('/post', controller.attachPost);

module.exports = router;