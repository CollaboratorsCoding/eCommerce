const fse = require('fs-extra');
const chalk = require('chalk');


fse.copy(".env.production", "production/.env", (err) => {
	if (err) return console.error(err);
	return console.log(chalk.green('✔ .env.production copied to production/.env'))
});

fse.copy("build", "production/build", (err) => {
	if (err) return console.error(err);
	return console.log(chalk.green('✔ build copied to production/build'))
});


fse.copy("server.js", "production/server.js", (err) => {
	if (err) return console.error(err);
	return console.log(chalk.green('✔ server.js copied to production/server.js'))
});

fse.readJson("package.json", (err, data) => {
	fse.outputJson("production/package.json", {
		name: data.name,
		version: data.version,
		private: data.private,
		scripts: {
			start: "cross-env NODE_ENV=production node server.js"
		},
		dependencies: data.dependencies
	}, {spaces: '\t'}, (err) => {
		if (err) return console.error(err);
		return console.log(chalk.green("✔ package.json created"))	
	})
})