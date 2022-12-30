const Post = require('./postsModel');


module.exports.getPosts = async function (req, res, next) {
    const page = req.query.page;
    const limit = req.query.limit;
  
    try {
      const posts = await Post.paginateThroughPosts(page, limit);
      res.status(200).json(posts);
    } catch (err) {
      next(err);
    }
  };

module.exports.getRecentPosts = async function (req, res, next) {
  try {
    const posts = await Post.getPosts();
    //const recentPosts = posts.sort(...po datumu);
    res.status(200).json(posts);
  } catch (err) {
    next(err);
  }
}

module.exports.getPostById = async function (req, res, next) {
    const postId = req.params.postId;
  
    try {
      const post = await Post.getPostById(postId);
      if (post === null) {
        const error = new Error(`Post is not found`);
        error.status = 404;
        throw error;
      }
      res.status(200).json(post);
    } catch (err) {
      next(err);
    }
};

module.exports.createPost = async function (req, res, next) {
    const postType = req.body.postType;
    const gameId = req.body.gameId;
    const gameName = req.body.gameName;
    const username = req.body.username;
    const reviewText = req.body.reviewText;
    const reviewScore = req.body.reviewScore;

    try {
      const post = await Post.createPost(postType, gameId, gameName, username, reviewText, reviewScore);
      if (post === null) {
        const error = new Error(`Post wasn't created!`);
        error.status = 404;
        throw error;
      }
      res.status(200).json(post);
    } catch (err) {
      next(err);
    }
};

module.exports.editReview = async function (req, res, next) {
    const postId = req.params.postId;
  
    try {
      const post = await Post.getPostById(postId);
      if (post === null) {
        const error = new Error(`Post not found`);
        error.status = 404;
        throw error;
      }
      post = await Post.editReview(postId, req.body.newText, req.body.newScore);
      res.status(200).json(post);
    } catch (err) {
      next(err);
    }
};


module.exports.deletePost = async function (req, res, next) {
    //const ownerId = req.userId;  mora da se namesti autentifikacija prvo
    const postId = req.params.postId;
  
    try {
      const post = await Post.getPostById(postId);

      if (!post) {
        const error = new Error('Post not found!');
        error.status = 404;
        throw error;
      }
  
      /*if (post.userId.toString() !== ownerId) {
        const error = new Error('You are not authorized to remove this post!');
        error.status = 403;
        throw error;
      }*/
  
      await Post.deletePost();
      res.status(200).json({ message: `Post successfully removed!` });
    } catch (err) {
      next(err);
    }
}