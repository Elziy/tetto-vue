import Vue from 'vue'
import Vuex from 'vuex'
import auth from "./modules/auth";
import Home from "@/store/modules/home";
import space from "./modules/space";
import upload from "@/store/modules/upload";
import artwork from "@/store/modules/artwork";
import defaultStore from "@/store/modules/defaultStore";
import search from "@/store/modules/Search";

Vue.use(Vuex)	// 应用Vuex插件

// 创建并暴露store
export default new Vuex.Store({
	modules: {
		auth,
		Home,
		space,
		upload,
		artwork,
		defaultStore,
		search,
	}
})
