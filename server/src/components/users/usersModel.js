const mongoose = require('mongoose');
//const bcrypt = require('bcrypt');
const jwtUtil = require('../../../utils/jwt');

//const SALT_ROUNDS = 10;

const userSchema = new mongoose.Schema({
  username: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
 /* hash: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
  salt: {
    type: mongoose.Schema.Types.String,
    required: true,
  },*/
  password: {
    type: mongoose.Schema.Types.String,
    required: true  
  },
  email: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
  status: {
    type: mongoose.Schema.Types.Boolean,
    default: true
  },
  playing: {
    type: [mongoose.Schema.Types.ObjectId],
    default: [],
  },
  finished: {
    type: [mongoose.Schema.Types.ObjectId],
    default: [],
  },
  backlog: {
    type: [mongoose.Schema.Types.ObjectId],
    default: [],
  },
  reviewed: {
    type: [mongoose.Schema.Types.ObjectId],
    default: [],
  },
  posts: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Post',
    default: [],
  },
  imgUrl: {
    type: mongoose.Schema.Types.String,
    default: '',
  },
});

/*userSchema.methods.setPassword = async function (password) {
  this.salt = await bcrypt.genSalt(SALT_ROUNDS);
  this.hash = await bcrypt.hash(password, this.salt);;
};

userSchema.methods.isValidPassword = async function (password) {
  return await bcrypt.compare(password, this.hash);
};*/

const User = mongoose.model('User', userSchema);

/**
 * Dohvata jedan dokument-korisnika iz baze.
 * @param {string} username Korisnicko ime.
 * @returns {Promise<mongoose.Document>} Dokument koji predstavlja korisnika za dato korisnicko ime.
 */
async function getUserByUsername(username) {
  username = username.toLowerCase();
  const user = await User.findOne({ username }).exec();
  return user;
}

async function getUserByEmail(email){
  const user = await User.findOne({ email }).exec();
  return user;  
}

async function getUserById(userId){
  const user = await User.findById(userId).exec();
  return user;  
}

/** 
 * Kreira JSON Web Token sa podacima o korisniku.
 * @param {string} username Korisnicko ime.
 * @returns {Promise<string>} JWT sa podacima o korisniku sa datim korisnickim imenom.
*/ 

async function getUserJWTByUsername(username) {
  const user = await getUserByUsername(username);
  if (!user) {
    throw new Error(`User with username ${username} does not exist!`);
  }
  return jwtUtil.generateJWT({
    id: user.id,
    username: user.username,
    email: user.email,
    name: user.name,
    imgUrl: user.imgUrl,
  });
}

/*
 * Pamti novog korisnika u bazi podataka.
 * @param {string} username Korisnicko ime.
 * @param {string} password Lozinka.
 * @param {string} email Adresa elektronske poste.
 * @param {string} name Ime i prezime.
 * @returns {Promise<string>} JWT sa podacima o novom korisniku.
 */

async function registerNewUser(username, password, email) {
  const user = new User();
  user.username = username;
  user.status = false;
  //await user.setPassword(password);
  user.password = password;
  user.email = email;

  await user.save();
  return getUserJWTByUsername(username);
}

/*
 * Azurira osnovne podatke o korisniku.
 * @param {string} username Korisnicko ime.
 * @param {string} name Novo ime i prezime.
 * @param {string} email Nova adresa elektronske poste.
 * @returns {Promise<string>} JWT sa azuriranim podacima o korisniku.
 */

async function updateUserData(username, name, email) {
  const user = await getUserByUsername(username);
  user.name = name;
  user.email = email;
  await user.save();
  //return getUserJWTByUsername(username);
}

async function getPostsForUser(username) {
  const user = await (await getUserByUsername(username)).populate('posts');
  return user.posts;
}

async function changeStatus(email, curStatus){
  const user = await getUserByEmail(email);
  user.status = curStatus;

  await user.save();
}

/**
 * Azurira korisnikovu profilnu sliku.
 * @param {string} userId Identifikator korisnika.
 * @param {string} imgUrl Putanja slike na serveru.
 */
async function changeUserProfileImage(username, imgUrl) {
  const user = await getUserByUsername(username);
  user.imgUrl = imgUrl;
  await user.save();
}

async function addFinishedGame(username, gameId){
  const user = await getUserByUsername(username);

  if(user.finished.includes(gameId))
    return new Error("Game is already on finished list!");

  user.finished.push(gameId);
  
  //TOFIX:
  // Not sure if the code below is neccesary so ill comment it out
  // Reason : Because it will just cause confusion (this is not to be expected)
  //if(user.playing.includes(gameId))
    //user.playing = user.playing.filter(curGameId => gameId != curGameId.valueOf());

  await user.save();
  return getUserJWTByUsername(username);
}

async function addPlayingGame(username, gameId){
  const user = await getUserByUsername(username);

  if(user.playing.includes(gameId))
    return new Error("Game is already on played list!");

  user.playing.push(gameId);
  
  await user.save();
  return getUserJWTByUsername(username);
}

async function addBacklogGame(username, gameId){
  const user = await getUserByUsername(username);
  
  if(user.backlog.includes(gameId))
    return new Error("Game is already on backlog list!");
  user.backlog.push(gameId);
  
  await user.save();
  return getUserJWTByUsername(username);
}

async function addReviewedGame(username, gameId){
  const user = await getUserByUsername(username);
  
  if(user.reviewed.includes(gameId))
    return new Error("Game is already reviewed!");
  user.reviewed.push(gameId);
  
  await user.save();
  return getUserJWTByUsername(username);
}

async function removeFinishedGame(username, gameId){
  const user = await getUserByUsername(username);

  if(!user.finished.includes(gameId))
    return new Error("Game is not on finished list!");

  user.finished = user.finished.filter(curGameId => gameId != curGameId.valueOf());

  await user.save();
  return getUserJWTByUsername(username);
}

async function removePlayingGame(username, gameId){
  const user = await getUserByUsername(username);

  if(!user.playing.includes(gameId))
    return new Error("Game is not on playing list!");

  user.playing = user.playing.filter(curGameId => gameId != curGameId.valueOf());

  await user.save();
  return getUserJWTByUsername(username);
}

async function removeBacklogGame(username, gameId){
  const user = await getUserByUsername(username);

  if(!user.backlog.includes(gameId))
    return new Error("Game is not on backlog list!");

  user.backlog = user.backlog.filter(curGameId => gameId != curGameId.valueOf());

  await user.save();
  return getUserJWTByUsername(username);
}

async function removeReviewedGame(username, gameId){
  const user = await getUserByUsername(username);

  if(!user.reviewed.includes(gameId))
    return new Error("Game is not on reviewed list!");

  user.reviewed = user.reviewed.filter(curGameId => gameId != curGameId.valueOf());

  await user.save();
  return getUserJWTByUsername(username);
}

async function addPost(username, postId){
  const user = await getUserByUsername(username);

  if(user.posts.includes(postId))
    return new Error("This post is already linked to this user!");

  user.posts.push(postId);

  await user.save();
  return getUserJWTByUsername(username);
}

async function removePost(username, postId){
  const user = await getUserByUsername(username);
  
  if(!user.posts.includes(postId))
    return new Error("This post is not linked to this user!");

  user.posts = user.posts.filter(curPostId => postId != curPostId.valueOf());

  await user.save();
  return getUserJWTByUsername(username);
}

async function getFinishedGames(username){
  const user = await (await getUserByUsername(username)).populate('finished');
  return user.finished.map((idObject) => idObject.valueOf(mongoose.SchemaType.ObjectId));
}

async function getPlayingGames(username){
  const user = await (await getUserByUsername(username)).populate('playing');
  return user.playing.map((idObject) => idObject.valueOf(mongoose.SchemaType.ObjectId));
}

async function getBacklogGames(username){
  const user = await (await getUserByUsername(username)).populate('backlog');
  return user.backlog.map((idObject) => idObject.valueOf(mongoose.SchemaType.ObjectId));
}

async function getReviewedGames(username){
  const user = await (await getUserByUsername(username)).populate('reviewed');
  return user.reviewed.map((idObject) => idObject.valueOf(mongoose.SchemaType.ObjectId));
}


module.exports = {
  getUserByUsername,
  getUserByEmail,
  getUserById,
  getUserJWTByUsername,
  registerNewUser,
  updateUserData,
  changeUserProfileImage,
  changeStatus,
  addFinishedGame,
  addPlayingGame,
  addBacklogGame,
  addReviewedGame,
  removeFinishedGame,
  removePlayingGame,
  removeBacklogGame,
  removeReviewedGame,
  addPost,
  removePost,
  getPostsForUser,
  getFinishedGames,
  getPlayingGames,
  getBacklogGames,
  getReviewedGames
};
