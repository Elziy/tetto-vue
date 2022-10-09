import axios from "axios";
import store from "@/store";
import router from '@/router'
import {Message} from "element-ui";
import NProgress from "nprogress";

const actions = {
	set(context, aid) {
		NProgress.start();
		axios.get("image/imgs/" + aid)
			.then(res => {
				if (res.data.code === 0) {
					store.state.artwork.atlas = res.data.data.atlas
					store.state.artwork.userInfo = res.data.data.userInfoRes;
					store.state.artwork.imgs = res.data.data.imgEntities;
					store.state.artwork.tags = res.data.data.tags;
					store.state.artwork.aid = res.data.data.aid;
					store.state.artwork.latestAtlas = res.data.data.latestAtlas;
					if (store.state.auth.uid == store.state.artwork.userInfo.uid) {
						store.state.artwork.self = true;
					}
					document.title = res.data.data.atlas.title + ' - ' + store.state.artwork.userInfo.username + '的插画';
				} else if (res.data.code === 401) {
					router.push("/login");
				} else {
					Message.error('暂无该作品');
					router.replace("/404")
				}
			}, err => {
				Message.error(err)
			})
		NProgress.done();
	}
}
const mutations = {}
const state = {
	// 是否是自己的作品
	self: false,
	// 作品集信息
	atlas: null,
	// 作品集作者信息
	userInfo: null,
	// 作品集图片信息
	imgs: [],
	// 作品集标签信息
	tags: [],
	// 作品集id
	aid: null,
	// 最新作品集
	latestAtlas: [],
};

export default {
	namespaced: true,
	actions,
	mutations,
	state,
}
