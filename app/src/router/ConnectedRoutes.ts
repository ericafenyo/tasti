import MyProfile from '@/screens/Profile/MyProfile.vue';

export default [
  {
    path: '/account/profile',
    name: 'profile',
    component: MyProfile,
    meta: { requiresAuth: true },
  },
];
