process.env.NODE_ENV = 'development';
const compiler = require('./utils/compiler').default;

const chalk = require('chalk');
const paths = require('../config/paths');
const fs = require('fs-extra');

console.log(
	`${chalk.magenta('\n[INFO]')} For correct work you have to start` +
		` your ${chalk.underline(
			'create-react-app'
		)} server with ${chalk.underline('npm start')} command.`
);

fs.emptyDirSync(paths.appBuildServer);
fs.copySync(paths.serverAssets, paths.appBuildServer);

fs.ensureDirSync(paths.appBuild);

fs.writeJSONSync(`${paths.appBuild}/assets-manifest.json`, {});

compiler.watch(null, (err, stats) => {
	if (err) {
		console.error(err.stack || err);
		if (err.details) {
			console.error(err.details);
		}
		return;
	}

	const info = stats.toJson();

	if (stats.hasErrors()) {
		console.error(info.errors);
	}

	if (stats.hasWarnings()) {
		console.warn(info.warnings);
	}
});
