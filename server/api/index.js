const express = require('express');
const UserController = require('./controllers/UserController');
const CartController = require('./controllers/CartController');

const api = express.Router();

/* rest api */

// CART API

api.get('/add-cart/:id', CartController.addToCart);
api.get('/get-cart', CartController.getItemsCart);
api.get('/remove/:id', CartController.remove);
api.get('/reduce/:id', CartController.removeOne);

// USER API

api.get('/profile', UserController.getprofile);

/* ... */

module.exports = api;
