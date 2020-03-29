import { User } from '@/data/Injector';

export default {
    namespaced: true,
    state: {
        accessToken: ''
    },
    mutations: {
        setToken(state: any, token: string) {
            state.accessToken = token;
        }
    },
    actions: {
        async create(_: any, userInfo: any) {
            return User.create(userInfo);
        },

        async authenticate({ commit }: any, { username, password }: any) {
            const response = await User.authenticate(username, password);
            commit('setToken', response.data.access_token);
            return response;
        },

        getProfile() {
            return User.profile();
        },

        getFollowers({ state }: any) {
            return User.followers(state.userId);
        },

        requestPasswordReset(_: any, request: any) {
            return User.requestPasswordReset(request)
        },

        resetPassword(_: any, { request, token, email }: any) {
            return User.resetPassword(request, email, token);
        }

    },

    getters: {
        getAccessToken(state: any) {
            return state.accessToken;
        }
    }
}