const path = require('path');

// Export a function. Accept the base config as the only param.
module.exports = async ({ config, mode }) => {
	config.resolve.extensions.push('.ts', '.tsx', '.vue', '.css', '.less', '.scss', '.sass', '.html');

	// Make whatever fine-grained changes you need
	config.module.rules.push({
		test: /\.scss$/,
		use: [ 'style-loader', 'css-loader', 'sass-loader' ],
		include: path.resolve(__dirname, '../')
	});

	// Return the altered config
	return config;
};
