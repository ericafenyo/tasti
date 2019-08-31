import Vue from 'vue';
import Vuex from 'vuex';

import { registerUser } from '../data/endpoints';

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
		createUser({ commit }, user) {
			registerUser(user);
			commit('CREATE_USER', user);
		}
	}
});

export default store;
