import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import UserModule from './UserModule';
import RecipeModule from './recipeModule';

Vue.use(Vuex);


export default new Vuex.Store({
  plugins: [createPersistedState()],
  modules: {
    user: UserModule,
    recipe: RecipeModule
  }
});
