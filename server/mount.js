import morgan from 'morgan';
import express, { Router } from 'express';
import passport from 'passport';
import session from 'express-session';
import mongoose from 'mongoose';
import compression from 'compression';
import Loadable from 'react-loadable'

import cookieParser from 'cookie-parser';

import passportConfig from './passport';

// Our loader - this basically acts as the entry point for each page load
// import loader from './loader';
// import api from './api';

const app = express();
const PORT = process.env.PORT || 3000;

const expressStaticGzip = require('express-static-gzip');

const MongoStore = require('connect-mongo')(session);
const dbConnector = require('./db_connector');
require('dotenv').config();

const isDev = process.env.NODE_ENV !== 'production';

dbConnector(process.env.DB_CONNECT);




let expressRouter;

app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
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

const getRouter = () => {
	const newRouter = Router();
	newRouter.use('/api', require('./api').default);
	newRouter.use(require('./loader').default);
	expressRouter = newRouter;
};

if (!isDev) {
	app.use(Router().get('/', require('./loader').default));
	app.use(
		expressStaticGzip(`${process.cwd()}/build/client`, {
			enableBrotli: true,
			orderPreference: ['br'],
		})
	);
	getRouter()
	app.use((req, res, next) => {
		expressRouter(req, res, next);
	});
}

export default (devMiddleware) => {
	app.use(express.static('build/client/'));
	devMiddleware(app)
	getRouter()
	if (module.hot && isDev) {
		module.hot.accept(['./loader.js', './api/index.js'], getRouter);
	}

	app.use((req, res, next) => {
		expressRouter(req, res, next);
	});
}



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
