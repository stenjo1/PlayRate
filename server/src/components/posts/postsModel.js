const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const postSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  postType: {
    type: mongoose.Schema.Types.String,
    required: true,
    enum: ['Review', 'Playing', 'Backlog', 'Finished', 'NoType'] //idk
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  gameId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Game',
    required: true
  },
  reviewText: {
    type: mongoose.Schema.Types.String
  },
  reviewScore: {
    type: mongoose.Schema.Types.Number
  },
  postTimestamp: {
    type: mongoose.Schema.Types.Date
  }
});

postSchema.plugin(mongoosePaginate);

const Post = mongoose.model('Post', postSchema);

async function getPosts(){
  return Post.find({}).exec();
}


async function createPost(postType, gameId, userId, reviewText, reviewScore) {
    const newPost = new Post({
    _id: new mongoose.Types.ObjectId(),
    postType: postType,
    userId: userId,
    gameId: gameId,
    postTimestamp: new Date()
  });
  
  newPost.reviewText = reviewText;
  newPost.reviewScore = reviewScore;
  
  return await newPost.save();
}

async function getPostById(postId) {
  return await Post.findById(postId).exec();
}

async function editReview(postId, newText, newScore) {
  const post = await Post.findById(postId).exec();
  if (post.postType !== 'Review')
    throw error;

  if (newScore) {
    post.reviewScore = newScore;
  }
  if (newText) {
    post.reviewText = newText;
  }

  await post.save();
}

/**
 * Pronalazi sve postove u bazi, pri cemu se vrsi njihova paginacija na osnovu eventualnih parametara.
 * Metod ih vraca sortirane po datumu kreiranja.
 * @param {number} page Broj stranice u paginaciji. Podrazumevano je 1.
 * @param {number} limit Broj postova po stranici. Podrazumevano je 10.
 * @returns {Promise<mongoose.PaginateResult>} Paginacija postova.
 */
 async function paginateThroughPosts(page = 1, limit = 10) {
  return await Post.paginate({}, { page, limit, sort: 'postTimestamp'});
}

async function deletePost(postId) {
  await Post.findByIdAndDelete(postId).exec();
}  

module.exports = {
  getPosts,
  paginateThroughPosts,
  createPost,
  editReview,
  deletePost,
  getPostById
};