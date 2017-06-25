var webpack = require('webpack');
var path = require('path');

const resolvePath = function(p) { return path.resolve(__dirname, p) };

const resolve = require('resolve');

function npmResolverPlugin() {
	return {
		resolve(filename, source, options) {
			return resolve.sync(filename, {basedir: path.dirname(source)});
		}
	};
}

module.exports = {
	entry: {
		'app': './src/app/main.ts',
		'vendor': './src/app/vendor.ts',
		'polyfills': './src/app/polyfills.ts'
	},

	output: {
		path: resolvePath('dist'),
		publicPath: '/',
		filename: '[name].js',
		chunkFilename: '[id].chunk.js'
	},

	resolve: {
		extensions: ['.ts', '.js'],
		modules: [
			resolvePath('src'),
			'node_modules'
		]
	},

	module: {
		rules: [
			{
				test: /\.ts$/,
				use: [
					{ loader: 'ts-loader' },
					{ loader: 'angular2-template-loader'}
				]
			},
			// component styles
			// {
			// 	test: /\.scss$/,
			// 	loader: extractCSS.extract(['css','sass']),
			// 	include: [resolvePath("src/app/components")]
			// },
			{
				test: /\.css$/,
				include: [resolvePath("src/app/components")],
				use: [
					{ loader: 'raw-loader' }
				],
			},
			// component templates
			{
				test: /\.html$/,
				use: [
					{ loader: 'raw-loader' }
				]
			},
			{
				test: /\.pug$/,
				use: [
					{
						loader: 'pug-ng-html-loader',
						options: {plugins: [npmResolverPlugin()]}
					}
				]
			},
			// vendor styles
			{
				test: /\.css$/,
				include: [resolvePath("node_modules")],
				use: [
					{ loader: 'style-loader' },
					{ loader: 'css-loader'}
				],
			},
		]
	},

	plugins: [
		new webpack.optimize.CommonsChunkPlugin({
			name: ['app', 'vendor', 'polyfills']
		}),
		// https://github.com/AngularClass/angular2-webpack-starter/issues/993
		// new webpack.ContextReplacementPlugin(
		// 	/angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
		// 	__dirname
		// ),
	],

	devtool: 'source-map'
};
