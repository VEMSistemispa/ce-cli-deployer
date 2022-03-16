require = require('esm')(module /*, options*/);
require('./cli/cli').cli(process.argv).then(console.log);