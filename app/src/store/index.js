import Vue from 'vue';
import Vuex from 'vuex';

import { user } from '../data/model/User';

Vue.use(Vuex);

const initialState = {
	users: []
};
const store = new Vuex.Store({
	state: initialState,

	mutations: {
		CREATE_USER(state, payload) {
			state.users.push(payload);
		}
	},


	actions: {
		createUser({ commit }, userInfo) {
			user.signUp(userInfo);
			commit('CREATE_USER', payload);
		}
	}
});

export default store;
