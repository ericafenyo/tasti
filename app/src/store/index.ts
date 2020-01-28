import Vue from 'vue';
import Vuex from 'vuex';
import { User, Recipe } from '@/data/Injector';
import { RecipeRequestModel } from '@/data/recipe/recipe.model';
import { RecipeService } from '@/data/recipe/recipe.service';

Vue.use(Vuex);

const initialState = {
  isModalOpen: false,
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
      return User.createAccount(userInfo);
    },

    async authenticate({ commit }, { username, password }) {
      const response = await User.authenticate(username, password);
      commit('setToken', response.data.access_token);
      return response;
    },

    createRecipe(_, recipeInfo: RecipeRequestModel) {
      const response = Recipe.create(recipeInfo);
      console.log(response);
    },

    getProfile() {
      return User.profile();
    },

    getRecipes() {
      return Recipe.find();
    }
  }
});
