import { ObjectLiteral } from '@/types';

export default {
    namespaced: true,
    state: {
        'access_token': ''
    },
    mutations: {
        setToken(state: ObjectLiteral, token: string) {
            state.accessToken = token;
        }
    },
}