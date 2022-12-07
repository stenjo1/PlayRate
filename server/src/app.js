const path = require('path');
const fs = require('fs');

global.__uploadDir = path.join(__dirname, 'resources');
if (!fs.existsSync(__uploadDir)) {
    fs.mkdirSync(__uploadDir);
}

const express = require('express');
/*const mongoose = require('mongoose');

//TODO: smisliti nove rute ja sam lupila nesto osnovno hvala
const userRoutes = require('./components/users/usersAPI');
const gameRoutes = require('./components/games/gamesAPI');
const postRoutes = require('./components/games/postsAPI');

const app = express();

const mongoDBString = 'mongodb://localhost:27017/playrate';
const mongoDBReplicationString = 'mongodb://localhost:27017,localhost:27018,localhost:27019/playrate?replicaSet=rs';
mongoose
  .connect(mongoDBString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Successfully connected to MongoDB!');
  });
*/
app.use(express.urlencoded({
    extended: false,
  })
);

app.use(express.json());

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
    if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PATCH, PUT, DELETE');
  
      return res.status(200).json({});
    }

    next();
});
  
app.use('/api/users', userRoutes);
app.use('/api/games', gameRoutes);
app.use('/api/posts', postRoutes);

app.use(express.static(__uploadDir));

app.use(function (req, res, next) {
    const error = new Error('Request not supported!');
    error.status = 405;
  
    next(error);
  });
  
  app.use(function (error, req, res, next) {
  
    const statusCode = error.status || 500;
    res.status(statusCode).json({
      message: error.message,
      status: statusCode,
      stack: error.stack,
    });
  });
  
  module.exports = app;
  