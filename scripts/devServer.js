
const webpack = require('webpack');
const webpackConfig = require('../config/webpack.config.node');

new Promise(async resolve => {
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
	require('../build/server/index.js').mount.default(require('./devMiddleware'));
});

