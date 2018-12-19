import express from 'express';
import CartController from './controllers/CartController';
import UserController from './controllers/UserController';
import checkJwt from '../middlewares/jwt.middleware';

const api = express.Router();

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

export default api;
