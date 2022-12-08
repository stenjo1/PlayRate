const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const gameSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: mongoose.Schema.Types.String,
    required: true
  },
  description: {
    type: mongoose.Schema.Types.String,
    required: true
  },
  relatedPosts: {
    type: [mongoose.Schema.Types.ObjectId],
    required: true
  },
  numberOfReviews: {
    type: mongoose.Schema.Types.Number,
    required: true
  },
  reviewScore: {
    type: mongoose.Schema.Types.Number,
    required: true
  },
});

const Game = mongoose.model('Game', gameSchema);

/**
 * Finds the game in the database based on the given id
 * @param {string} gameId 
 * @returns {Promise<mongoose.Document>} that game or `null`
 */
 async function getGameById(gameId) {
  return await Game.findById(gameId).exec();
}

/**
 * Attaches a new post to the game
 * @param {string} gameId
 * @param {string} postId
 * @param {string} postType
 * @param {number} reviewScore
 */
 async function attachPost (gameId, postId, postType, reviewScore) {
  const game = await Game.findById(gameId).exec();
  game.relatedPosts.push(postId);
  if (postType === 'Review') {
    if (reviewScore) {
      newScore = (game.reviewScore*game.numberOfReviews + reviewScore) / (game.numberOfReviews+1);
      game.updateOne({reviewScore: newScore});
    }
    game.increment({numberOfReviews});
  }
  await game.save();
}

/**
 * Pronalazi sve igre u bazi, pri cemu se vrsi njihova paginacija na osnovu eventualnih parametara.
 * @param {number} page Broj stranice u paginaciji. Podrazumevano je 1.
 * @param {number} limit Broj igara po stranici. Podrazumevano je 10.
 * @returns {Promise<mongoose.PaginateResult>} Paginacija igara.
 */
 async function paginateThroughGames(page = 1, limit = 10) {
  return await Game.paginate({}, { page, limit, populate: relatedPosts, sort: 'reviewScore'});
}

  
  module.exports = {
    attachPost,
    getGameById,
    paginateThroughGames
  };