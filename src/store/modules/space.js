import axios from "axios";
import store from "@/store";
import router from '@/router'
import {Message} from "element-ui";

const actions = {
	// 查询请求用户的空间信息
	setUserInfo(context, uid) {
		axios.get('auth/user/info/' + uid)
			.then(res => {
					if (res.data.code === 0) {
						// 设置是否是自己的空间
						if (uid == store.state.auth.uid) {
							store.state.space.self = true;
						}
						store.commit('space/SET_USER_INFO', res.data.data);
					} else if (res.data.code === 401) {
						router.push("/login");
					} else {
						console.log(111)
						router.replace("/404")
					}
				},
				err => {
					router.replace("/404")
					Message.error('获取用户信息失败');
				});
	}
}
const mutations = {
	SET_USER_INFO(state, userInfo) {
		state.userInfo = userInfo
	}
}
const state = {
	self: false,
	userInfo: {},
};

export default {
	namespaced: true,
	actions,
	mutations,
	state,
}
