const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  postType: {
    type: mongoose.Schema.Types.String,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  gameId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  reviewText: {
    type: mongoose.Schema.Types.String,
  },
  reviewScore: {
    type: mongoose.Schema.Types.Integer,
  },
});

const Post = mongoose.model('Post', postSchema);
  
module.exports = Post;