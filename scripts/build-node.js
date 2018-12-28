process.env.NODE_ENV = 'production';

const compiler = require('./utils/compiler').default;
const chalk = require('chalk');
const paths = require('../config/paths');
const fs = require('fs-extra');

console.log(
	`${chalk.magenta(
		'[INFO]'
	)} Before running SSR production build you have to run ${chalk.underline(
		'npm run build'
	)} to create an optimized production build of your ${chalk.underline(
		'create-react-app'
	)} application.`
);

console.log(chalk.cyan('\nCreating production Server build...\n'));

fs.copySync(paths.serverAssets, paths.appBuildServer);

compiler.run((err, stats) => {
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
	const statsString = stats.toString({
		colors: true,
	});
	console.log(statsString);

	if (stats.hasErrors()) {
		console.error(chalk.red('\nBuild failed!'));
	} else {
		console.log(chalk.green('\nBuild successful!'));
	}
});
