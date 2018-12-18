const express = require('express');
const UserController = require('./controllers/UserController');

const api = express.Router();

/* rest api */

// USER API

api.get('/profile', UserController.getprofile);

/* ... */

module.exports = api;
