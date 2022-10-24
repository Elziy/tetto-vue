const actions = {}
const mutations = {
	SET_KEYWORD(state, keyword) {
		state.keyword = keyword
	}
}
const state = {
	keyword: '',
};

export default {
	namespaced: true,
	actions,
	mutations,
	state,
}
