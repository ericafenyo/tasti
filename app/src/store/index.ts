import Vue from 'vue';
import Vuex from 'vuex';
import { userRepository } from '@/data/Injector';

Vue.use(Vuex);

const initialState = {
  users: [],
  token: ''
};

export const store = new Vuex.Store({
  state: initialState,

  mutations: {
    async setToken(state, payload: string) {
      localStorage.setItem('access_token', payload);
      state.token = payload;
    }
  },

  actions: {
    async createUser({ commit }, userInfo: object) {
      userRepository.createAccount(userInfo);
    },

    async authenticate({ commit }, { username, password }) {
      const response = await userRepository.authenticate(username, password);
      commit('setToken', response.data.access_token);
    }
  }
});
