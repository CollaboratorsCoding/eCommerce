const fs = require('fs');

export default p =>
	fs.readFileSync(`${process.cwd()}/build/server/${p}`, 'utf8');
