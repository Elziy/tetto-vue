const actions = {
	login({commit}, userInfo) {
		commit('SET_TOKEN', userInfo.token);
		commit('SET_UID', userInfo.uid);
		commit('SET_USERNAME', userInfo.username);
		commit('SET_AVATAR', userInfo.avatar);
	},
	logout({commit}) {
		commit('SET_TOKEN', '');
		commit('SET_UID', '');
		commit('SET_USERNAME', '');
		commit('SET_AVATAR', '');
	}
};

const mutations = {
	SET_TOKEN(state, token) {
		localStorage.setItem('token', token);
		state.token = token
	},
	SET_UID(state, uid) {
		localStorage.setItem('uid', uid);
		state.uid = uid;
	},
	SET_USERNAME(state, user) {
		localStorage.setItem('username', user);
		state.username = user;
	},
	SET_AVATAR(state, avatar) {
		localStorage.setItem('avatar', avatar);
		state.avatar = avatar;
	}
};

const state = {
	token: localStorage.getItem('token') || '',
	uid: localStorage.getItem('uid') || '',
	avatar: localStorage.getItem('avatar') || '',
	username: localStorage.getItem('username') || '',
};

export default {
	namespaced: true,
	actions,
	mutations,
	state
}
