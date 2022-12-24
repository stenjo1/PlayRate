const Game = require('./gamesModel');


module.exports.getGamesPagination = async function (req, res, next) {
    const page = req.query.page;
    const limit = req.query.limit;
  
    try {
      const games = await Game.paginateThroughGames(page, limit);
      res.status(200).json(games);
    } catch (err) {
      next(err);
    }
  };

  module.exports.getAllGames = async function (req, res, next) {
  
    try {
      const games = await Game.getGames();
      res.status(200).json(games);
    } catch (err) {
      next(err);
    }
  };

  module.exports.getReviewsForGame = async function (req, res, next) {
    const gameId = req.params.gameId;

    try {
      const game = await Game.getReviewsForGame(gameId);
      res.status(200).json(game);
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
    const gameId = req.body.gameId;
    try {
      const game = await Game.getGameById(gameId);
      if (game === null) {
        const error = new Error(`Game is not found`);
        error.status = 404;
        throw error;
      }
      await Game.attachPostId(gameId, req.body.postId, req.body.reviewScore);
      res.status(200).json(game);
    } catch (err) {
      next(err);
    }
};

module.exports.getPopularGames = async function (req, res, next) {
  const num = req.query.num;
  try {
    const games = await Game.getGames();
    const popularGames = games.sort((game1, game2) => {
      return game2.reviewScore - game1.reviewScore;
    }).slice(0, num);
    res.status(200).json(popularGames);
  } catch (err) {
    next(err);
  }
};


