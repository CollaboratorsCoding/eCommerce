const nodemon = require('nodemon');
const chalk = require('chalk');

function spawnNodemon(filePath) {
	nodemon({
		script: filePath,
		ext: 'js json',
	});

	nodemon
		.on('start', () => {
			console.log(`${chalk.yellow('[nodemon]')} App has started`);
		})
		.on('quit', () => {
			console.log(`${chalk.yellow('[nodemon]')} App has quit`);
		})
		.on('restart', files => {
			console.log(
				`${chalk.yellow('[nodemon]')} App restarted due to: ${files}`
			);
		});

	process.once('SIGINT', () => {
		nodemon.once('exit', () => {
			process.exit();
		});
	});

	return nodemon;
}

exports.default = spawnNodemon;
