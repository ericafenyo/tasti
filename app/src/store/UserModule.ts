import { User } from '@/data/Injector';
import decodeJwt from 'jwt-decode';
import { buildImageUrl } from '@/utils';

export interface CurrentUserInfo {
  id: string;
  name: string;
  email_verified: boolean;
  avatar_path: string;
}

export default {
  namespaced: true,
  state: {
    accessToken: '',
  },
  mutations: {
    setToken(state: any, token: string) {
      state.accessToken = token;
    },
    invalidateToken(state: any) {
      state.accessToken = '';
    },
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

    async logout({ commit }: any) {
      commit('invalidateToken');
    },

    getProfile() {
      return User.profile();
    },

    getFollowers({ state }: any) {
      return User.followers(state.userId);
    },

    requestPasswordReset(_: any, request: any) {
      return User.requestPasswordReset(request);
    },

    resetPassword(_: any, { request, token, email }: any) {
      return User.resetPassword(request, email, token);
    },

    recipes() {
      return User.recipes();
    },
  },

  getters: {
    accessToken(state: any) {
      return state.accessToken;
    },

    isAuthenticated(state: any) {
      return Boolean(state.accessToken);
    },

    info(state: any) {
      try {
        if (state.accessToken) {
          const {
            name,
            avatar_path,
            email_verified,
          }: CurrentUserInfo = decodeJwt(state.accessToken);

          return {
            name,
            avatarUrl: buildImageUrl(avatar_path),
            emailVerified: email_verified,
          };
        }
      } catch (error) {
        console.error(error);
        return {};
      }
    },
  },
};
