import Vue from 'vue';
import PortalVue from 'portal-vue';
import Vuelidate from 'vuelidate';
const VueAspectRatio = require('vue-aspect-ratio');
import { store } from './store';

Vue.use(Vuelidate as any);
Vue.use(PortalVue);
Vue.component('vue-aspect-ratio', VueAspectRatio);

import router from '@/router';

// Styles
import '../src/scss/index.scss';
import './scss/normalize.css';
import './scss/bootstrap-grid.css';

import App from './App.vue';

// Components
import Icon from './components/Icons/Icon.vue';
import Composite from './components/Forms/Composite.vue';
import Textarea from './components/Input/Textarea.vue';
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
import PhotoPicker from './components/PhotoElements/PhotoPicker/PhotoPicker.vue';
import TitleBar from '@/components/Navigation/TitleBar.vue';
import i18n from './i18n';
import { Route } from 'vue-router';
import vuetify from './plugins/vuetify';

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
Vue.component('PhotoPicker', PhotoPicker);
Vue.component('TitleBar', TitleBar);

Vue.config.productionTip = false;

/**
 * Returns true if the route requires user authentication.
 *
 * @param route the {@link Route} we want to navigate to.
 */
const isRequiredAuth = (route: Route) =>
  route.matched.some((record) => record.meta.requiresAuth);

/**
 * Returns true if the user is authenticated;
 */
const isAuthenticated = () => store.getters['accessToken'];

router.beforeEach((to, _, next) => {
  if (isRequiredAuth(to) && isAuthenticated()) {
    window.console.log('Not authenticated');
    return next('/');
  }
  return next();
});

new Vue({
  el: '#app',
  router,
  i18n,
  store,
  vuetify,
  render: (h) => h(App)
}).$mount('#app');
