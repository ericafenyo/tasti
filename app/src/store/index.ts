import Vue from 'vue';
import Vuex from 'vuex';
import { userRepository, recipeService } from '@/data/Injector';
import { RecipeRequestModel } from '@/data/recipe/recipe.model';

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
    createUser({ commit }, userInfo: object) {
      return userRepository.createAccount(userInfo);
    },

    async authenticate({ commit }, { username, password }) {
      const response = await userRepository.authenticate(username, password);
      commit('setToken', response.data.access_token);
      return response;
    },

    createRecipe(_, recipeInfo: RecipeRequestModel) {
      const response = recipeService.create(recipeInfo);
      console.log(response);
      
    }
  }
});
