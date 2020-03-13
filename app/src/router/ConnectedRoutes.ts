import CreateRecipe from '@/views/CreateRecipe/CreateRecipe.vue';
import Profile from '@/views/User/Profile.vue';

export default [
    {
        path: '/account/profile',
        name: 'profile',
        component: Profile,
        meta: { requiresAuth: true },
    },
    {
        path: '/recipes/create',
        name: 'create-recipe',
        component: CreateRecipe,
        meta: { requiresAuth: true },
    }
]