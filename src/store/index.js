import Vue from 'vue'
import Vuex from 'vuex'
import auth from "./modules/auth";
import space from "./modules/space";
import defaultStore from "@/store/modules/defaultStore";

Vue.use(Vuex)	// 应用Vuex插件

// 创建并暴露store
export default new Vuex.Store({
	modules: {
		auth,
		space,
		defaultStore
	}
})
