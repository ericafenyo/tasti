import Home from '@/views/Home.vue';
import Login from '@/views/User/Login.vue';
import Register from '@/views/User/Register.vue';
import RequestPasswordReset from '@/components/Authentication/RequestPasswordReset.vue';
import ResetPassword from '@/components/Authentication/ResetPassword.vue';
import Recipe from '@/components/Recipe/Recipe.vue';

export default [
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/auth/sign-up',
        name: 'sign-up',
        component: Register
    },
    {
        path: '/auth/sign-in',
        name: 'sign-in',
        props: true,
        component: Login
    },
    {
        path: '/auth/password/request-reset',
        name: 'request-password-reset',
        component: RequestPasswordReset
    },
    {
        path: '/auth/password/reset',
        name: 'reset-password',
        component: ResetPassword
    },
    {
        path: '/recipe/:id',
        name: 'recipe-detail',
        component: Recipe
    },
]