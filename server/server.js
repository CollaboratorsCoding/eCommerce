// Express requirements
import compression from 'compression';
import express from 'express';
import morgan from 'morgan';

import passport from 'passport';
// import forceDomain from 'forcedomain';
import session from 'express-session';
import mongoose from 'mongoose';
import Loadable from 'react-loadable';
import cookieParser from 'cookie-parser';
import expressStaticGzip from 'express-static-gzip';
import passportConfig from './passport';

// Our loader - this basically acts as the entry point for each page load
import loader from './loader';
import api from './api';

const MongoStore = require('connect-mongo')(session);
const dbConnector = require('./db_connector');
require('dotenv').config();

dbConnector(process.env.DB_CONNECT);

// const passportConfig = require('./passport');
// Create our express app using the port optionally specified
const app = express();
const PORT = process.env.PORT || 3000;

// NOTE: UNCOMMENT THIS IF YOU WANT THIS FUNCTIONALITY
/*
  Forcing www and https redirects in production, totally optional.

  http://mydomain.com
  http://www.mydomain.com
  https://mydomain.com

  Resolve to: https://www.mydomain.com
*/
// if (process.env.NODE_ENV === 'production') {
//   app.use(
//     forceDomain({
//       hostname: 'www.mydomain.com',
//       protocol: 'https'
//     })
//   );
// }

const sessionConfig = session({
	secret: process.env.SESSION_SECRET,
	resave: false,
	saveUninitialized: false,
	store: new MongoStore({
		mongooseConnection: mongoose.connection,
	}),
	cookie: {
		maxAge: 24 * 60 * 60 * 1000,
		httpOnly: true,
	},
});

// Compress, parse, log, and raid the cookie jar
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(cookieParser());
app.use(sessionConfig);
passportConfig(passport);
app.use(passport.initialize());

// Set up homepage, static assets, and capture everything else
app.use('/api', api);
app.use(express.Router().get('/', loader));
app.use(
	expressStaticGzip(`${process.env.INIT_CWD}/build/client`, {
		enableBrotli: true,
		orderPreference: ['br'],
	})
);

app.use(loader);

// We tell React Loadable to load all required assets and start listening - ROCK AND ROLL!
Loadable.preloadAll().then(() => {
	app.listen(PORT, console.log(`App listening on port ${PORT}!`));
});

// Handle the bugs somehow
app.on('error', error => {
	if (error.syscall !== 'listen') {
		throw error;
	}

	const bind = typeof PORT === 'string' ? `Pipe ${PORT}` : `Port ${PORT}`;

	switch (error.code) {
		case 'EACCES':
			console.error(`${bind} requires elevated privileges`);
			process.exit(1);
			break;
		case 'EADDRINUSE':
			console.error(`${bind} is already in use`);
			process.exit(1);
			break;
		default:
			throw error;
	}
});
