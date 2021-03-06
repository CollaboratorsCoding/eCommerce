import express from 'express';
import CartController from './controllers/CartController';
import UserController from './controllers/UserController';
import ProductController from './controllers/ProductController';
import OrderController from './controllers/OrderController';
import CategoryController from './controllers/CategoryController';
import checkJwt from '../middlewares/jwt.middleware';

const api = express.Router();

/* rest api */

// CATEGORY API

api.post('/add-category', CategoryController.addCategory);
api.get('/get-categories', CategoryController.getCategories);

// PRODUCT API

api.post('/add-product', ProductController.addProduct);
api.post('/add-review/:slug', ProductController.addReview);
api.post('/add-reply', ProductController.addReply);
api.post('/add-review-rate/:id', ProductController.addReviewRate);
api.get('/get-reviews/:slug', ProductController.getReviews);
api.get('/get-products/:category_slug', ProductController.getProducts);
api.get('/get-product/:slug', ProductController.getProduct);

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

// ORDER API
api.post('/order', OrderController.newOrder);
api.get('/orders-history', checkJwt, OrderController.OrdersHistory);

/* ... */

export default api;
