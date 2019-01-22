const path = require('path');
const nodeExternals = require('webpack-node-externals');
const webpack = require('webpack');

const NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {
	mode: NODE_ENV,
	target: 'node',
	entry: ['webpack/hot/poll?1000', './server/mount.webpack'],
	output: {
		path: path.join(__dirname, '../build/server'),
		// Build it as a commonjs library so we can include it
		filename: 'server.js',
		library: 'mount',
		// Build it as a commonjs library so we can include it
		libraryTarget: 'commonjs',
	},

	externals: [
		nodeExternals({
			// Include the hot reload polling code in the bundle though
			whitelist: ['webpack/hot/poll?1000'],
		}),
	],
	module: {
		rules: [
			{
				test: /\.(jpe?g|png|gif|svg|ico)$/i,
				loader: 'file-loader',
				options: {
					limit: 10000,
					name: '[name].[hash:8].[ext]',
					publicPath: '/static/media/',
					outputPath: '../client/static/media/',
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
		// new webpack.DefinePlugin({
		// 	'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
		// }),
		new webpack.NamedModulesPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin(),
	],
};
