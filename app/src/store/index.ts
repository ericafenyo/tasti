import Vue from 'vue';
import Vuex from 'vuex';
import { userRepository } from '@/data/Injector';

Vue.use(Vuex);

const initialState = {
	users: []
};
export const store = new Vuex.Store({
	state: initialState,

	mutations: {
		CREATE_USER(state, payload: object) {
			// state.users.push(payload);
		}
	},

	actions: {
		createUser({ commit }, userInfo: object) {
			userRepository.createUser(userInfo);
			commit('CREATE_USER', userInfo);
		}
	}
});
