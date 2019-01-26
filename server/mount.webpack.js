import morgan from 'morgan';
import { Router } from 'express';
import passport from 'passport';
import session from 'express-session';
import mongoose from 'mongoose';

import cookieParser from 'cookie-parser';

import passportConfig from './passport';

// Our loader - this basically acts as the entry point for each page load
// import loader from './loader';
// import api from './api';

const expressStaticGzip = require('express-static-gzip');

const MongoStore = require('connect-mongo')(session);
const dbConnector = require('./db_connector');
require('dotenv').config();

const isDev = process.env.NODE_ENV !== 'production';

dbConnector(process.env.DB_CONNECT);

export default app => {
	let expressRouter;
	app.use(morgan('dev'));
	app.use(cookieParser());
	app.use(
		session({
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
		})
	);

	passportConfig(passport);
	app.use(passport.initialize());
	if (!isDev) {
		app.use(Router().get('/', require('./loader').default));
		app.use(
			expressStaticGzip(`${process.cwd()}/build/client`, {
				enableBrotli: true,
				orderPreference: ['br'],
			})
		);
	}
	const getRouter = () => {
		const newRouter = Router();
		require('./entry').default(newRouter);
		expressRouter = newRouter;
	};
	getRouter();
	if (module.hot && isDev) {
		module.hot.accept('./entry.js', getRouter);
	}
	app.use((req, res, next) => {
		// A swappable route handler for HMR updates
		expressRouter(req, res, next);
	});
};
