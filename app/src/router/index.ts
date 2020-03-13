import Vue from 'vue';
import Router from 'vue-router';

import ConnectedRoutes from '@/router/ConnectedRoutes';
import DisconnectedRoutes from '@/router/DisconnectedRoutes'

Vue.use(Router);
export default new Router({
    mode: 'history',
    routes: [...ConnectedRoutes, ...DisconnectedRoutes]
});
