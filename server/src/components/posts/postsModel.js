const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const postSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  postType: {
    type: mongoose.Schema.Types.String,
    required: true,
    enum: ['Review', 'Playing', 'Backlog', 'Finished'] //idk
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

/**
 * Creates a post
 * @param {string} postType
 * @param {string} gameId
 * @param {string} userId
 * @param {string} reviewText
 * @param {number} reviewScore
 * @returns {Promise<mongoose.Document>} that post or `null`
 */
async function createPost(postType, gameId, userId, reviewText, reviewScore) {
    const newPost = new Post({
    _id: new mongoose.Types.ObjectId(),
    userId: userId,
    gameId: gameId,
    postTimestamp: new Date(),
    postType: postType,
  });
  if (reviewText) {
    newPost.reviewText = reviewText;
  }
  if (reviewScore) {
    newPost.reviewScore = reviewScore;
  }
  return await newPost.save();
}

//ovde bismo mogli kao getPostsByGameId ili userID, ali onda da ne cuvamo id-ove postova u korisnicima i igricama u bazi, nzm jos sta nam je bolje
  
/**
 * Finds the post in the database based on the given id
 * @param {string} postId 
 * @returns {Promise<mongoose.Document>} that post or `null`
 */
async function getPostById(postId) {
 // p = await Post.findById(postId).exec();
  //return p.populate(userId).populate(p.gameId.projection('name')).exec();
  return await Post.findById(postId).exec();
}

/**
 * Edits an already existing post of review type
 * @param {string} postId
 * @param {string} newText 
 * @param {number} newScore
 */
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
// ne radi, kaze da paginate nije fja
 async function paginateThroughPosts(page = 1, limit = 10) {
  return await Post.paginate({}, { page, limit, sort: 'postTimestamp'});
}

/**
 * Deletes info about the post with the given id
 * @param {string} postId 
 */
async function deletePost(postId) {
  await Post.deleteOne({_id: postId}).exec();
  
}

// Skup funkcija koji se izvozi treba da bude minimalan, tj. da odrzava jedino interfejs nad nasim podacima.
// Kontroler koji koristi model ne sme da zna da li se koristi MongoDB, MySQL ili nesto trece.
// Njemu treba da budu dostupne samo informacije o argumentima funkcija i njihovim povratnim vrednostima.
module.exports = {
  paginateThroughPosts,
  createPost,
  editReview,
  deletePost,
  getPostById
};