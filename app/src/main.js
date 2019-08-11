import Vue from 'vue';
import App from './App.vue';
import VeeValidate from 'vee-validate';
import './css/index.module.css';

import store from './store';

Vue.use(VeeValidate);
Vue.config.productionTip = false;

new Vue({
	el: '#app',
	render: (h) => h(App),
	store
}).$mount('#app');
