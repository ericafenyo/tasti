const path = require('path');
const rootPath = path.resolve(__dirname, '../src');

// Export a function. Accept the base config as the only param.
module.exports = async ({ config, mode }) => {
	config.resolve.extensions.push('.ts', '.tsx', '.vue', '.css', '.less', '.scss', '.sass', '.html');

	const sassLoaderOptions = {
		loader : 'sass-loader',
		options : {
			data: `@import "@/scss/_variables.scss";`
		}
	}
	// Make whatever fine-grained changes you need
	config.module.rules.push({
		test: /\.scss$/,
		use: [ 'style-loader', 'css-loader', sassLoaderOptions],
		include: path.resolve(__dirname, '../')
	});

	config.resolve.alias['@'] = rootPath
	config.resolve.alias['~'] = rootPath

	// Return the altered config
	return config;
};