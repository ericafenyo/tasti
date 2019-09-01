const path = require('path');
module.exports = {
	chainWebpack: (config) => {
		const svgRule = config.module.rule('svg');
		svgRule.uses.clear();
		svgRule.use('vue-svg-loader').loader('vue-svg-loader');

		const oneOfsMap = config.module.rule('scss').oneOfs.store;
		oneOfsMap.forEach((item) => {
			item
				.use('sass-resources-loader')
				.loader('sass-resources-loader')
				.options({
					// Provide path to the file with resources
					resources: './src/scss/_variables.scss'
				})
				.end();
		});
	}
};
