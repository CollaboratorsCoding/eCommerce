const express = require('express');
const UserController = require('./controllers/UserController');
const CartController = require('./controllers/CartController');

const api = express.Router();

const checkJwt = require('../middlewares/jwt.middleware');

/* rest api */

// CART API

api.get('/add-cart/:id', CartController.addToCart);
api.get('/get-cart', CartController.getItemsCart);
api.get('/remove/:id', CartController.remove);
api.get('/reduce/:id', CartController.removeOne);

// USER API

api.get('/profile', checkJwt, UserController.getprofile);
api.put('/profile', checkJwt, UserController.editProfile);
api.post('/sendresetPassword', UserController.sendresetPassword);
api.post('/resetPassword', UserController.resetPassword);
api.post('/signin', UserController.signin);
api.post('/signup', UserController.signup);
api.get('/logout', UserController.logout);

/* ... */

module.exports = api;
