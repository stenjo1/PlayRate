const User = require("./usersModel");
const Game = require("../games/gamesModel")

module.exports.registerUser = async (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;

    try {
        if (!username || !password || !email) {
          const error = new Error('Please provide all data for a new user');
          error.status = 400;
          throw error;
        }
    
        const loweredUsername = username.toLowerCase();
        const loweredEmail = email.toLowerCase();

        const usernameCheck = await User.getUserByUsername(loweredUsername);
        const emailCheck =  await User.getUserByEmail(loweredUsername);

        if(usernameCheck !== null){
          const error = new Error('Username has been taken already!');
          error.status = 400;
          throw error;
        }

        if(emailCheck !== null){
          const error = new Error('This email has been registered already!');
          error.status = 400;
          throw error;
        }

        const jwt = await User.registerNewUser(loweredUsername, password, loweredEmail);
        return res.status(201).json({
          token: jwt,
        });
      } catch (err) {
        next(err);
      }
}

module.exports.loginUser = async (req, res, next) => {
  const username = req.username;

  try {
    const jwt = await User.getUserJWTByUsername(username);
    return res.status(201).json({
      token: jwt,
    });
  } catch (err) {
    next(err);
  }
};

module.exports.addFinishedGame = async (req, res, next) => {
  const gameId = req.body.gameId;
  const username = req.body.username;

  try{
    const jwt = await User.addFinishedGame(username,gameId)
    if(jwt instanceof Error)
      throw(jwt);

    return res.status(201).json({
      token: jwt,
    });
  }catch (err){
    next(err);
  }

};

module.exports.addPlayingGame = async (req, res, next) => {
  const gameId = req.body.gameId;
  const username = req.body.username;

  try{
    const jwt = await User.addPlayingGame(username,gameId)
    if(jwt instanceof Error)
      throw(jwt);

    return res.status(201).json({
      token: jwt,
    });
  }catch (err){
    next(err);
  }
};

module.exports.addBacklogGame = async (req, res, next) => {
  const gameId = req.body.gameId;
  const username = req.body.username;

  try{
    const jwt = await User.addBacklogGame(username,gameId)

    if(jwt instanceof Error)
      throw(jwt);

    return res.status(201).json({
      token: jwt,
    });

  }catch (err){
    next(err);
  }

};

module.exports.addReviewedGame = async (req, res, next) => {
  const gameId = req.body.gameId;
  const username = req.body.username;

  try{
    const jwt = await User.addReviewedGame(username,gameId)

    if(jwt instanceof Error)
      throw(jwt);

    return res.status(201).json({
      token: jwt,
    });

  }catch (err){
    next(err);
  }

};

module.exports.removeFinishedGame = async (req, res, next) => {
  const gameId = req.body.gameId;
  const username = req.body.username;

  try{
    const jwt = await User.removeFinishedGame(username,gameId);

    if(jwt instanceof Error)
      throw(jwt);

    return res.status(201).json({
      token: jwt,
    });

  }catch (err){
    next(err);
  }
}

module.exports.removePlayingGame = async (req, res, next) => {
  const gameId = req.body.gameId;
  const username = req.body.username;

  try{
    const jwt = await User.removePlayingGame(username,gameId);

    if(jwt instanceof Error)
      throw(jwt);

    return res.status(201).json({
      token: jwt,
    });

  }catch (err){
    next(err);
  }
}

module.exports.removeBacklogGame = async (req, res, next) => {
  const gameId = req.body.gameId;
  const username = req.body.username;

  try{
    const jwt = await User.removeBacklogGame(username,gameId);

    if(jwt instanceof Error)
      throw(jwt);

    return res.status(201).json({
      token: jwt,
    });

  }catch (err){
    next(err);
  }
}

module.exports.removeReviewedGame = async (req, res, next) => {
  const gameId = req.body.gameId;
  const username = req.body.username;

  try{
    const jwt = await User.removeReviewedGame(username,gameId);

    if(jwt instanceof Error)
      throw(jwt);

    return res.status(201).json({
      token: jwt,
    });

  }catch (err){
    next(err);
  }
}

module.exports.addPost = async (req, res, next) => {
  const postId = req.body.postId;
  const username = req.body.username;

  try{
    const jwt = await User.addPost(username,postId)
    if(jwt instanceof Error)
      throw(jwt);

    return res.status(201).json({
      token: jwt,
    });
  }catch (err){
    next(err);
  }
};

module.exports.removePost = async (req, res, next) => {
  const postId = req.body.postId;
  const username = req.body.username;

  try{
    const jwt = await User.removePost(username,postId)
    if(jwt instanceof Error)
      throw(jwt);

    return res.status(201).json({
      token: jwt,
    });
  }catch (err){
    next(err);
  }
};

module.exports.getPostsForUser = async function (req, res, next) {
  const username = req.params.username;

  try {
    const posts = await User.getPostsForUser(username);
    res.status(200).json(posts);
  } catch (err) {
    next(err);
  }
};

module.exports.getUserByUsername = async function(req, res, next) {
  const user = await User.getUserByUsername(req.params.username);
  try {
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
}

module.exports.getUserById = async function(req, res, next) {
  const user = await User.getUserById(req.params.userId);
  try {
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
}

module.exports.getFinishedGames = async (req, res, next) => {
  const username = req.params.username;

  try {
    const finishedIDs = await User.getFinishedGames(username);
    const finished = await Promise.all(finishedIDs.map(ID => Game.getGameById(ID)));
    res.status(200).json(finished);
  } catch (err) {
    next(err);
  }
}

module.exports.getPlayingGames = async (req, res, next) => {
  const username = req.params.username;

  try {
    const playingIDs = await User.getPlayingGames(username);
    const playing = await Promise.all(playingIDs.map(ID => Game.getGameById(ID)));
    res.status(200).json(playing);
  } catch (err) {
    next(err);
  }
}

module.exports.getBacklogGames = async (req, res, next) => {
  const username = req.params.username;

  try {
    const backlogIDs = await User.getBacklogGames(username);
    const backlog = await Promise.all(backlogIDs.map(ID => Game.getGameById(ID)));
    res.status(200).json(backlog);
  } catch (err) {
    next(err);
  }
}

module.exports.getReviewedGames = async (req, res, next) => {
  const username = req.params.username;

  try {
    const reviewedIDs = await User.getReviewedGames(username);
    const reviewed = await Promise.all(reviewedIDs.map(ID => Game.getGameById(ID)));
    res.status(200).json(reviewed);
  } catch (err) {
    next(err);
  }
}

module.exports.setImgUrl = async (req, res, next) => {
  const username = req.body.username;
  const imgUrl = req.body.imgUrl;

  console.log(req.body)

  try{
    const jwt = await User.changeUserProfileImage(username,imgUrl)

    if(jwt instanceof Error)
      throw(jwt);

    return res.status(201).json({
      token: jwt,
    });

  }catch (err){
    next(err);
  }
}