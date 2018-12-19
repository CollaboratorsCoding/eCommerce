const webpack = require('webpack');
const config = require('../../config/webpack.config.node');

const compiler = webpack(config);

exports.default = compiler;

exports.config = config;
