const express = require('express');
const User = require('../src/components/users/usersModel');
const jwt = require('./jwt');

/**
 * Funkcija srednjeg sloja koja proverava da li je moguce prijaviti korisnika sa datim korisnickim imenom i lozinkom.
 * @param {express.Request} req 
 * @param {express.Response} res 
 * @param {express.NextFunction} next 
 */

module.exports.canAuthenticate = async (req, res, next) => {
  const email = req.body.email.toLowerCase();
  const password = req.body.password;

  try {
    // Validiramo podatke
    if (!email || !password) {
      const error = new Error('Please provide both email and password');
      error.status = 400;
      throw error;
    }

    const user = await User.getUserByEmail(email);
    if (!user) {
      const error = new Error(`Invalid login!`);
      error.status = 404;
      throw error;
    }
    
    //TOFIX: This is primitive way of handling user passwords!!!
    if(user.password != password){
      const error = new Error(`Invalid login!`);
      error.status = 404;
      throw error;
    }

    // Ako je sve u redu, onda cemo na nivou req objekta sacuvati neophodne podatke o autorizaciji,
    // na primer, identifikator i username korisnika iz baze podataka
    
    //TOFIX
    req.userId = user._id;
    req.username = user.username;

    // Pozivamo narednu funkciju srednjeg sloja
    next();
  } catch (err) {
    next(err);
  }
};

/**
 * Funkcija srednjeg sloja koja proverava da li je JWT token koji je klijent poslao validan.
 * @param {express.Request} req 
 * @param {express.Response} res 
 * @param {express.NextFunction} next 
 */

module.exports.isAuthenticated = async (req, res, next) => {
  try {
    // Ocekujemo da klijent uz svoj zahtev prosledi HTTP zaglavlje oblika:
    // "Authorization": "Bearer <JWT>"
    const authHeader = req.header("Authorization");
    if (!authHeader) {
      const error = new Error('You need to pass Authorization header with your request!');
      error.status = 403;
      throw error;
    }

    const token = authHeader.split(' ')[1];
    const decodedToken = jwt.verifyJWT(token);
    if (!decodedToken) {
      const error = new Error('Not Authenticated!');
      error.status = 401;
      throw error;
    }

    // Citamo podatke iz dekodiranog tokena i cuvamo na nivou req objekta,
    // kako bi naredna funkcija srednjeg sloja mogla da iskoristi taj podatak.
    req.userId = decodedToken.id;
    req.username = decodedToken.username;

    // Pozivamo narednu funkciju srednjeg sloja
    next();
  } catch (err) {
    next(err);
  }
};
