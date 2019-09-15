module.exports = {
	chainWebpack: (config) => {
		// Load svg as modules
		const svgRule = config.module.rule('svg');
		svgRule.uses.clear();
		svgRule.use('vue-svg-loader').loader('vue-svg-loader');
	}
};
