import { configure } from '@storybook/vue';
import Vue from 'vue';
import { extend, ValidationProvider } from 'vee-validate';
import * as rules from 'vee-validate/dist/rules';
import en from 'vee-validate/dist/locale/en';
import '../src/scss/index.scss';

// loop over all rules
for (let rule in rules) {
	extend(rule, {
		...rules[rule], // add the rule
		message: en.messages[rule] // add its message
	});
}

// Register Component globally
Vue.component('ValidationProvider', ValidationProvider);

// automatically import all files ending in *.stories.js
const req = require.context('../src', true, /\.stories\.js$/);
function loadStories() {
	req.keys().forEach((filename) => req(filename));
}

configure(loadStories, module);
