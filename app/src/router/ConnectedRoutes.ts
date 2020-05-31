import MyProfile from '@/screens/Profile/MyProfile.vue';

export default [
  {
    path: '/a/profile',
    // name: 'profile',
    component: MyProfile,
    meta: { requiresAuth: true },
  }
];
