const path = require('path');
const nodeExternals = require('webpack-node-externals');
const webpack = require('webpack');

const NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {
	mode: NODE_ENV,
	entry: './server/server.js',
	output: {
		path: path.resolve(__dirname, '..', 'build'),
		filename: 'server/server.js',
	},
	target: 'node',
	externals: [nodeExternals()],
	module: {
		rules: [
			{
				test: /\.(jpe?g|png|gif|svg|ico)$/i,
				loader: 'file-loader',
				options: {
					limit: 10000,
					name: '[name].[hash:8].[ext]',
					publicPath:
						NODE_ENV === 'production'
							? '/static/media/'
							: '/media/',
					outputPath:
						NODE_ENV === 'production'
							? '/client/static/media/'
							: '/client/media/',
				},
			},
			{
				test: /\.js$/,
				exclude: [/[/\\\\]node_modules[/\\\\]/],
				use: [
					{
						loader: require.resolve('babel-loader'),
						options: {
							babelrc: false,
							compact: false,
							presets: [
								'babel-preset-react-app',
								'@babel/preset-env',
							],
							plugins: [
								'@babel/plugin-syntax-dynamic-import',
								'dynamic-import-node',
								'react-loadable/babel',
								'babel-plugin-transform-class-properties',
							],
							cacheDirectory: true,
							highlightCode: true,
						},
					},
				],
			},
			{ test: /\.(.css|scss)$/, loader: 'ignore-loader' },
		],
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
		}),
		new webpack.optimize.OccurrenceOrderPlugin(),
	],
	resolve: {
		modules: ['node_modules'],
	},
};