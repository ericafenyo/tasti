import Vue from 'vue';
import VeeValidate from 'vee-validate';

import './scss/normalize.css';
import 'flexboxgrid/dist/flexboxgrid.min.css';
import App from './App.vue';

import store from './store';

Vue.use(VeeValidate);
Vue.config.productionTip = false;

new Vue({
	el: '#app',
	render: (h) => h(App),
	store
}).$mount('#app');
