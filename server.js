const express = require('express');
const compression = require('compression');
const Loadable = require('react-loadable');

const app = express();
const PORT = process.env.PORT || 3000;

const isDev = process.env.NODE_ENV !== 'production';

app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

if (isDev) {
	const webpack = require('webpack');
	const webpackConfig = require('./config/webpack.config.node');

	const buildPromise = new Promise(async resolve => {
		const compiler = webpack(webpackConfig);
		compiler.watch({ filename: '.' }, (err, stats) => {
			if (err) {
				console.error(err);
			}

			if (stats) {
				resolve();
			}
		});
	}).then(() => {
		// Mount the routes when ready (and only once via promise semantics):
		app.use(express.static('build/client/'));
		require('./devMiddleware')(app);
		require('./build/server/index.js').mount.default(app);
	});
	// waitForBuild middleware to avoid confusing 404s
	app.use((req, res, next) => {
		buildPromise.then(next, next);
	});
} else {
	require('./build/server/index.js').mount.default(app);
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
