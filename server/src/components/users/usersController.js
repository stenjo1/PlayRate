const User = require("./usersModel");

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