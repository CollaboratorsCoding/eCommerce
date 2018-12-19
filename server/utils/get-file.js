const fs = require('fs');

export default p =>
	fs.readFileSync(`${process.env.INIT_CWD}/build/${p}`, 'utf8');
