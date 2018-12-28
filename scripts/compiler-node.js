// see https://github.com/remy/nodemon/issues/95#issuecomment-143423483
process.stdout.isTTY = true;

process.env.NODE_ENV = 'development';

const compiler = require('./utils/compiler').default;
const chalk = require('chalk');

console.log(`${chalk.magenta('\n[INFO]')} Compiling node server`);

console.log(`${chalk.magenta('\n[INFO]')} Starting express server`);

compiler.run();
