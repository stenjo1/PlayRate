const express = require('express');

const router = express.Router();
const controller = require('./gamesController');

router.get('/', controller.getGamesPagination);
router.get('/all', controller.getAllGames);
router.get('/:gameId', controller.getGameById);
router.post('/:gameId', controller.attachPost);

module.exports = router;