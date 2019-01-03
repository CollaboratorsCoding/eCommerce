process.env.NODE_ENV = 'development';

const fs = require('fs-extra');
const webpack = require('webpack');
const config = require('../config/webpack.config.dev');
const paths = require('../config/paths');

// removes react-dev-utils/webpackHotDevClient.js at first in the array
config.entry.shift();
config.output.path = paths.appBuild;
fs.emptyDirSync(paths.appBuild);

function copyPublicFolder() {
	fs.copySync(paths.appPublic, paths.appBuild, {
		dereference: true,
		filter: file => file !== paths.appHtml,
	});
}

webpack(config).watch({}, (err, stats) => {
	if (err) {
		console.error(err);
	} else {
		copyPublicFolder();
	}
	console.error(
		stats.toString({
			chunks: false,
			colors: true,
		})
	);
});
