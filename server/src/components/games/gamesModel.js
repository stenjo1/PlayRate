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
    type: [mongoose.Schema.Types.String],
    ref: 'Post',
    required: true
  },
  imageUrl: {
    type: mongoose.Schema.Types.String
  },
  numberOfReviews: {
    type: mongoose.Schema.Types.Number,
    required: true
  },
  reviewScore: {
    type: mongoose.Schema.Types.Number,
    required: true
  },
  playersNumber: {
    type: mongoose.Schema.Types.Number,
    required: true
  },
  visitedNumber: {
    type: mongoose.Schema.Types.Number,
    required: true
  },
  favoritesNumber: {
    type: mongoose.Schema.Types.Number,
    required: true
  },
  likes: {
    type: mongoose.Schema.Types.Number,
    required: true
  }
});

gameSchema.plugin(mongoosePaginate);

const Game = mongoose.model('Game', gameSchema);

/**
 * Finds the game in the database based on the given id
 * @param {string} gameId 
 * @returns {Promise<mongoose.Document>} that game or `null`
 */
 async function getGameById(gameId) {
  return await Game.findById(gameId).exec();
}


/*
 * Attaches a new post to the game
 * @param {string} gameId
 * @param {string} postId
 * @param {string} postType
 * @param {number} reviewScore
 */
 async function attachPostId (gameId, postId, reviewScore) {
  const game = await Game.findById(gameId).exec();
  game.relatedPosts.push(postId);
  if (reviewScore>0) {
      newScore = game.reviewScore*game.numberOfReviews/(game.numberOfReviews+1) + reviewScore / (game.numberOfReviews+1);
      game.reviewScore = newScore;
      game.numberOfReviews+=1;
    }
  await game.save();
} 

async function getReviewsForGame (gameId) {
  const game = await Game.findById(gameId).populate('relatedPosts').exec();
  return game.relatedPosts.filter((post)=>post.postType==="Review");
}

/**
 * Pronalazi sve igre u bazi, pri cemu se vrsi njihova paginacija na osnovu eventualnih parametara.
 * @param {number} page Broj stranice u paginaciji. Podrazumevano je 1.
 * @param {number} limit Broj igara po stranici. Podrazumevano je 10.
 * @returns {Promise<mongoose.PaginateResult>} Paginacija igara.
 */
 async function paginateThroughGames(page = 1, limit = 10) {
  return await Game.paginate({}, { page, limit, populate: 'relatedPosts', sort: 'reviewScore'});
}


async function getGames(){
  return Game.find({}).exec();
}
  
  module.exports = {
    attachPostId,
    getGameById,
    paginateThroughGames,
    getGames,
    getReviewsForGame
  };