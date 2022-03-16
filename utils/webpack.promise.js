const webpack = require("webpack");
const util = require("util");

const webPackPromise = util.promisify(webpack);


module.exports = {
    webPackPromise: webPackPromise
}