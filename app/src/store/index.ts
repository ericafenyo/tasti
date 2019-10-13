import Vue from "vue";
import Vuex from "vuex";

import { user } from "../data/model/User";

Vue.use(Vuex);

const initialState = {
  users: [],
};
export const store = new Vuex.Store({
  state: initialState,

  mutations: {
    CREATE_USER(state, payload: object) {
      // state.users.push(payload);
    },
  },

  actions: {
    createUser({ commit }, userInfo: object) {
      user.signUp(userInfo, () => {});
      commit("CREATE_USER", userInfo);
    },
  },
});
