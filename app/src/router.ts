import Vue from 'vue';
import Router from 'vue-router';

import Login from './views/Login/Login.vue';
import Register from './views/Register/Register.vue';

Vue.use(Router);
export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      component: Login
    },
    {
      path: '/register',
      component: Register
    }
  ]
});
