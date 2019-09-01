import Vue from 'vue';

// Vee-validate
import { extend, ValidationProvider } from 'vee-validate';
import * as rules from 'vee-validate/dist/rules';
import en from 'vee-validate/dist/locale/en';

// Styles
import '../src/scss/index.scss';
import './scss/normalize.css';
import 'flexboxgrid/dist/flexboxgrid.min.css';

// APP
import App from './App.vue';

import store from './store';

// loop over all rules
for (let rule in rules) {
	extend(rule, {
		...rules[rule], // add the rule
		message: en.messages[rule] // add its message
	});
}

// Register Component globally
Vue.component('ValidationProvider', ValidationProvider);

Vue.config.productionTip = false;

new Vue({
	el: '#app',
	render: (h) => h(App),
	store
}).$mount('#app');
