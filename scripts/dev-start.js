process.env.NODE_ENV = 'development';

const compiler = require('./utils/compiler').default;
const chalk = require('chalk');

const paths = require('../config/paths');
const fs = require('fs-extra');

console.log(`${chalk.magenta('\n[INFO]')} Compiling node server`);

function copyPublicFolder() {
	fs.copySync(paths.appPublic, paths.appBuild, {
		dereference: true,
		filter: file => file !== paths.appHtml,
	});
}

async function init() {
	try {
		await fs.emptyDirSync(paths.appBuild);
		await copyPublicFolder();
		await fs.emptyDirSync(paths.appBuildServer);
		await fs.copySync(paths.serverAssets, paths.appBuildServer);
		await fs.ensureDirSync(paths.appBuild);
		await fs.writeJson(`${paths.appBuild}/asset-manifest.json`, {});
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
	} catch (err) {
		console.error(err);
	}
}

init();
