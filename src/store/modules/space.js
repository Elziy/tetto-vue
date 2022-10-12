import axios from "axios";
import store from "@/store";
import router from '@/router'
import {Message} from "element-ui";
import NProgress from "nprogress";

const actions = {
	// 查询请求用户的空间信息
	setUserInfo(context, uid) {
		NProgress.start();
		axios.get('auth/user/info/' + uid)
			.then(res => {
					if (res.data.code === 0) {
						// 设置是否是自己的空间
						if (uid == store.state.auth.uid) {
							store.state.space.self = true;
						} else {
							store.state.space.self = false;
						}
						store.commit('space/SET_USER_INFO', res.data.data);
						document.title = res.data.data.username + '的空间';
					} else if (res.data.code === 401) {
						router.push("/login");
					} else {
						Message.error('暂无该用户');
						router.replace("/404")
					}
				},
				err => {
					router.replace("/404")
					Message.error('获取用户信息失败');
				});
		NProgress.done();
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
