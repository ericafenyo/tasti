import Vue from 'vue';
import Router from 'vue-router';

import Home from './views/Home/Home.vue';
import Login from './views/Login/Login.vue';
import Register from './views/Register/Register.vue';
import CreateRecipe from './views/CreateRecipe/CreateRecipe.vue';
import Profile from './views/User/Profile.vue';

Vue.use(Router);
export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/join',
      component: Register
    },

    {
      path: '/account/profile',
      component: Profile
    },
    {
      path: '/recipes/new',
      component: CreateRecipe
    },
    {
      path: '/profile',
      component: Profile
    }
  ]
});
