import Vue from 'vue';
import VuxRx from 'vue-rx';
import PortalVue from 'portal-vue';

// Vee-validate
import { extend, ValidationProvider, ValidationObserver } from 'vee-validate';
import { required, email } from 'vee-validate/dist/rules';
import Vuelidate from 'vuelidate';

Vue.use(VuxRx);
Vue.use(Vuelidate);
Vue.use(PortalVue);

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
import Loader from './components/Loader.vue';
import Headline from './components/Headline/Headline.vue';
import Avatar from './components/Avatar/Avatar.vue';
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
Vue.component('Loader', Loader);
Vue.component('Headline', Headline);
Vue.component('Avatar', Avatar);
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
  el: '#app',
  store,
  i18n,
  router,
  render: (h) => h(App)
}).$mount('#app');
