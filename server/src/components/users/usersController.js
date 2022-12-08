const User = require("./usersModel");

module.exports.registerUser = async (req, res, next) => {
    console.log(req.body);
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;

    try {
        if (!username || !password || !email) {
          const error = new Error('Please provide all data for a new user');
          error.status = 400;
          throw error;
        }
    
        const jwt = await User.registerNewUser(username, password, email);
        return res.status(201).json({
          token: jwt,
        });
      } catch (err) {
        next(err);
      }
}