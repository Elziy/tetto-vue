const actions = {}
const mutations = {
	SET_TAGS: (state, tags) => {
		state.tags = tags
	}
}
const state = {
	// 作品集图片信息
	imgs: [],
	tags: [],
};

export default {
	namespaced: true,
	actions,
	mutations,
	state,
}
