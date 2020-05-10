import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import UserModule from '@/store/UserModule';
import RecipeModule from '@/store/recipeModule';
Vue.use(Vuex);

export const store = new Vuex.Store({
  plugins: [createPersistedState()],
  modules: {
    user: UserModule,
    recipe: RecipeModule
  }
});


