import Vue from 'vue';
import VuxRx from 'vue-rx';
import { initializeApp } from 'firebase';

// Vee-validate
import { extend, ValidationProvider, ValidationObserver } from 'vee-validate';
import { required, email } from 'vee-validate/dist/rules';
const en = require('vee-validate/dist/locale/en.json');
import Vuelidate from 'vuelidate';

Vue.use(VuxRx);
Vue.use(Vuelidate);

import router from './router';

// Styles
import '../src/scss/index.scss';
import './scss/normalize.css';
import './scss/bootstrap-grid.css';

import App from './App.vue';
import { store } from './store';

// Components
import Icon from './components/Icons/Icon.vue';
import Composite from './components/Forms/Composite.vue';
import Textarea from './components/Forms/Textarea.vue';
import Input from './components/Input/Input.vue';
import Button from './components/Button/Button.vue';
import Link from './components/Link/Link.vue';
import ButtonGroup from './components/Button/ButtonGroup.vue';
import Recipe from './components/Recipe/Recipe.vue';
import Alert from './components/Notification/Alert.vue';
import Notice from './components/Notification/Notice.vue';
import Overlay from './components/Overlay/Overlay.vue';
import Modal from './components/Modal.vue';
import i18n from './i18n';

Vue.component('Icon', Icon);
Vue.component('Composite', Composite);
Vue.component('Input', Input);
Vue.component('Textarea', Textarea);
Vue.component('Button', Button);
Vue.component('Link', Link);
Vue.component('ButtonGroup', ButtonGroup);
Vue.component('Recipe', Recipe);
Vue.component('Alert', Alert);
Vue.component('Notice', Notice);
Vue.component('Overlay', Overlay);
Vue.component('Modal', Modal);
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

const firebaseConfig = {
  apiKey: 'AIzaSyAYGxB6GBwC97mqDE0FdDz7bRF6OS5ZKTg',
  authDomain: 'tasti-1751d.firebaseapp.com',
  databaseURL: 'https://tasti-1751d.firebaseio.com',
  projectId: 'tasti-1751d',
  storageBucket: 'tasti-1751d.appspot.com',
  messagingSenderId: '144900147899',
  appId: '1:144900147899:web:5b69d724420203e914b79e'
};

new Vue({
  el: '#app',
  store,
  i18n,
  router,
  render: (h) => h(App),
  created() {
    initializeApp(firebaseConfig);
  }
}).$mount('#app');
