import { configure, addDecorator, addParameters } from '@storybook/vue';
import { DocsPage, DocsContainer } from '@storybook/addon-docs/blocks';
import Vue from 'vue';
import { extend, ValidationProvider } from 'vee-validate';
import * as rules from 'vee-validate/dist/rules';
import en from 'vee-validate/dist/locale/en';
import '../src/scss/index.scss';

addParameters({
	docs: {
		container: DocsContainer,
		page: DocsPage
	}
});

// loop over all rules
for (let rule in rules) {
	extend(rule, {
		...rules[rule], // add the rule
		message: en.messages[rule] // add its message
	});
}

// Register Component globally
Vue.component('ValidationProvider', ValidationProvider);

// automatically import all files ending in *.stories.js and *.stories.mdx
const req = require.context('../src', true, /\.stories\.(js|mdx)$/);
function loadStories() {
	req.keys().forEach((filename) => req(filename));
}

configure(loadStories, module);
