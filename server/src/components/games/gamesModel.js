const mongoose = require('mongoose');

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
    type: mongoose.Schema.Types.Integer,
    required: true
  },
  reviewScore: {
    type: mongoose.Schema.Types.Integer,
    required: true
  },
});

const Game = mongoose.model('Game', gameSchema);

  
  module.exports = Game;