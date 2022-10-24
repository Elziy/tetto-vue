const actions = {}
const mutations = {
	setShowNav(state, showDav) {
		state.showNav = showDav
	}
}
const state = {
	showNav: true,
};

export default {
	namespaced: true,
	actions,
	mutations,
	state,
}
