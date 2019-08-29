import Vue from 'vue';
import { ValidationProvider } from 'vee-validate';

import './scss/normalize.css';
import 'flexboxgrid/dist/flexboxgrid.min.css';
import App from './App.vue';

import store from './store';

// Register Component globally
Vue.component('ValidationProvider', ValidationProvider);

Vue.config.productionTip = false;

new Vue({
	el: '#app',
	render: (h) => h(App),
	store
}).$mount('#app');
