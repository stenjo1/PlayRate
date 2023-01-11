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
 async function attachPostId (gameId, postId, score) {
  const game = await Game.findById(gameId).exec();
  game.relatedPosts.push(postId);

  const currScore = game.reviewScore;
  const n = game.numberOfReviews;
  game.reviewScore = ( currScore * n + score) / (n + 1);
  console.log(game.reviewScore);

  game.numberOfReviews+=1;

  await game.save();
} 

async function removePost(gameId, postId, postReviewScore){
  const game = await Game.findById(gameId);
  
  if(!game.relatedPosts.includes(gameId))
    return new Error("This post is not linked to this game!");

  game.relatedPosts = game.relatedPosts.filter(curPostId => postId != curPostId.valueOf());
  const currScore = game.reviewScore;
  const n = game.numberOfReviews;
  game.reviewScore = (currScore*n - postReviewScore)/(n-1);
  game.numberOfReviews-=1;

  return await game.save();

}

async function updateReviewScore(gameId, oldScore, newScore){
  const game = await Game.findById(gameId);
  game.reviewScore = game.reviewScore + (newScore - oldScore)/game.numberOfReviews;
  const updatedGame =  await game.save();
  return updatedGame.reviewScore;

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
    getReviewsForGame,
    removePost,
    updateReviewScore
  };