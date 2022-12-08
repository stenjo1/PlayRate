const Game = require('./gamesModel');


module.exports.getGames = async function (req, res, next) {
    const page = req.query.page;
    const limit = req.query.limit;
  
    try {
      const games = await Game.paginateThroughPosts(page, limit);
      res.status(200).json(games);
    } catch (err) {
      next(err);
    }
  };

module.exports.getGameById = async function (req, res, next) {
    const gameId = req.params.gameId;
  
    try {
      const game = await Game.getGameById(gameId);
      if (game === null) {
        const error = new Error(`Game not found`);
        error.status = 404;
        throw error;
      }
      res.status(200).json(game);
    } catch (err) {
      next(err);
    }
};

module.exports.attachPost = async function (req, res, next) {
    const gameId = req.params.gameId;
    try {
      const game = await Game.getGameById(gameId);
      if (game === null) {
        const error = new Error(`Game is not found`);
        error.status = 404;
        throw error;
      }
      await game.attachPost(gameId, req.body.postId, req.body.postType, req.body.reviewScore);
    } catch (err) {
      next(err);
    }
};


