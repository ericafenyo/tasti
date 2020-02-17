import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

import { User, Recipe } from '@/data/Injector';
import { RecipeRequestModel } from '@/data/recipe/recipe.model';

Vue.use(Vuex);

const initialState = {
  isModalOpen: false,
  userId: ''
};

export const store = new Vuex.Store({
  plugins: [createPersistedState()],
  state: initialState,

  mutations: {
    async setToken(state, payload: string) {
      localStorage.setItem('access_token', payload);
    },

    async setUser(state, payload: string) {
      state.userId = payload;
    }
  },

  actions: {
    createUser({ commit }, userInfo: object) {
      return User.create(userInfo);
    },

    async authenticate({ commit }, { username, password }) {
      const response = await User.authenticate(username, password);
      commit('setToken', response.data.access_token);
      commit('setUser', response.data.id);
      return response;
    },

    createRecipe(_, recipeInfo: RecipeRequestModel) {
      return Recipe.create(recipeInfo);
    },

    getProfile() {
      return User.profile();
    },

    getRecipes() {
      return Recipe.find();
    },

    getFollowers({ state }) {
      return User.followers(state.userId);
    },

    requestPasswordReset(_, request) {
      return User.requestPasswordReset(request)
    },

    resetPassword(_, { request, token, email }) {
      return User.resetPassword(request, email, token);
    }
  }
});
