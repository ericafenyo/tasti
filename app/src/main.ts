import Vue from 'vue';

// Vee-validate
import { extend, ValidationProvider, ValidationObserver } from 'vee-validate';
import { required, email } from 'vee-validate/dist/rules';
const en = require('vee-validate/dist/locale/en.json');
import Vuelidate from 'vuelidate';
Vue.use(Vuelidate);
// Styles
import '../src/scss/index.scss';
import './scss/normalize.css';
import './scss/bootstrap-grid.css';

import App from './App.vue';
import { store } from './store';

// Add the required rule
extend('required', {
	validate: required.validate,
	message: (field) => `The ${field} field is required`
});

// Add the email rule
extend('email', {
	validate: email.validate,
	message: 'The {_field_} field must be a valid email'
});

// Custom  vee-validate rule
extend('checkbox', {
	validate: (value) => value
});

// // Register Component globally
Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);

Vue.config.productionTip = false;

new Vue({
	el: "#app",
	render: h => h(App),
	store
}).$mount("#app");
