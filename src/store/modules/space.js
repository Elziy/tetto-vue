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
						store.commit('auth/SET_TOKEN', '');
						Message.warning('登录已过期，请重新登录');
						router.replace('/login');
					} else {
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
	},
	OPEN_FOLLOWING(state, val) {
		state.flag = val
		state.followingDialog = true;
	},
	CLOSE_FOLLOWING(state) {
		state.followingDialog = false;
	},
}
const state = {
	self: false,
	userInfo: {},
	// 关注和粉丝列表对话框
	followingDialog: false,
	// 'following' 为关注，'follower' 为粉丝
	flag: ''
};

export default {
	namespaced: true,
	actions,
	mutations,
	state,
}
