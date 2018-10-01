module.exports = function generateWebpackConfig(name = 'code', config = {}, overideFn = x => x) {
	const webpack = require(`webpack`);
	const path = require('path');

	return (function(baseDir) {
		baseDir = config.baseDir ? config.baseDir : baseDir;

		return overideFn({
			entry: {
				[name]: path.resolve(baseDir + `/${name}/${name}`),
				...(config.entries || {})
			},
			output: {path: baseDir, filename: '[name].min.js'},
			devtool: 'source-map',
			resolve: {
				extensions: [".jsx", ".webpack.js", ".web.js", ".js", ".json"],
			},
			cache: {},
			externals: {
				'react': 'React',
				'react-dom': 'ReactDOM',
				...(config.externals || {})
				// 'prop-types': 'PropTypes',
				// 'classnames': 'classnames',
				// 'material-ui': 'Mui',
			},
			watchOptions: {
				ignored: [`${baseDir}/node_modules/`],
			},
			resolveLoader: {
				modules: ['node_modules'],
				extensions: ['.js', '.json'],
				mainFields: ['loader', 'main']
			},
			plugins: [],
			module: {
				loaders: [{
					test: /.jsx?$/,
					loader: 'babel-loader',
					exclude: /node_modules/,
					query: {
						presets: [
							"babel-preset-react",
							"babel-preset-es2015",
							...(config.presets || [])
						],

						plugins: [
							"babel-plugin-transform-runtime",
							"babel-plugin-external-helpers",
							"babel-plugin-transform-decorators-legacy",
							"babel-plugin-transform-class-properties",
							"babel-plugin-transform-object-rest-spread",
							"babel-plugin-syntax-async-functions",
							"babel-plugin-transform-regenerator",
							...(config.plugins || [])
						]
					}
				}]
			}
		});
	});
};