import Home from '@/screens/Home.vue';
import SignUp from '@/screens/Auth/SignUp.vue';
import SignIn from '@/screens/Auth/SignIn.vue';
import RequestPasswordReset from '@/screens/Auth/RequestPasswordReset.vue';
import ResetPassword from '@/screens/Auth/ResetPassword.vue';
import CreateRecipe from '@/screens/Recipe/Create.vue';
import Explore from '@/screens/Explore.vue';
import MyProfile from '@/screens/Profile/MyProfile.vue'

export default [
  {
    path: '/',
    name: 'home',
    component: Home,
    children: [
      {
        path: '/explore',
        name: 'explore',
        component: Explore,
      },
      {
        path: '/recipes/create',
        name: 'create-recipe',
        component: CreateRecipe,
        meta: { requiresAuth: true },
      },
      {
        path: '/account/profile',
        name: 'profile',
        component: MyProfile,
        meta: { requiresAuth: true },
      },

    ],
  },
  {
    path: '/auth/sign-up',
    name: 'sign-up',
    component: SignUp,
  },
  {
    path: '/auth/sign-in',
    name: 'sign-in',
    props: true,
    component: SignIn,
  },
  {
    path: '/auth/password/request-reset',
    name: 'request-password-reset',
    component: RequestPasswordReset,
  },
  {
    path: '/auth/password/reset',
    name: 'reset-password',
    component: ResetPassword,
  },
];
