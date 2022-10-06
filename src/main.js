import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './assets/css/global.css'

Vue.config.productionTip = false

//导入element
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)

//导入fas图标
import '@fortawesome/fontawesome-free/js/all.js'
import '@fortawesome/fontawesome-free/css/all.css'
import 'bootstrap/dist/css/bootstrap.min.css'

// 导入axios
import axios from 'axios'
// 配置请求的根路径
axios.defaults.baseURL = 'http://art.tetto.com/api/'

axios.defaults.headers.post['Content-Type'] =
	'application/x-www-form-urlencoded'

// axios.interceptors.request.use(
// 	function (config) {
// 		// 拦截每次请求,携带token
// 		config.headers.token = localStorage.getItem('token')
// 		return config
// 	},
// 	function (error) {
// 		return Promise.reject(error)
// 	}
// )

//请求拦截器
axios.interceptors.request.use(
	config => {
		if (localStorage.getItem('token') == null) {
			return config
		} else {
			config.headers.token = localStorage.getItem('token')
			return config
		}
	},
	error => {
		return Promise.error(error);
	}
)

Vue.prototype.$http = axios

Vue.filter('dateFormat', function (input) {
	let d = new Date(input);
	let year = d.getFullYear();
	let month = d.getMonth() + 1;
	let day = d.getDate() < 10 ? '0' + d.getDate() : '' + d.getDate();
	let hour = d.getHours();
	let minutes = d.getMinutes();
	let seconds = d.getSeconds();
	return year + '-' + month + '-' + day + ' ' + hour + ':' + minutes + ':' + seconds;
});

Vue.filter('birthdayFormat', function (input) {
	let d = new Date(input);
	let year = d.getFullYear();
	let month = d.getMonth() + 1;
	let day = d.getDate() < 10 ? '0' + d.getDate() : '' + d.getDate();
	return year + '-' + month + '-' + day;
});

Vue.filter('title', function (title) {
	if (title.length > 10) {
		return title.slice(0, 10) + '...';
	} else {
		return title
	}
});

Vue.filter('introduce', function (title) {
	if (title.length > 20) {
		return title.slice(0, 20) + ' ···';
	} else {
		return title
	}
});

import store from "@/store";

import { VueCropper } from 'vue-cropper'
Vue.use(VueCropper);


new Vue({
	store,
	router,
	render: (h) => h(App),
	beforeCreate() {
		// 安装全局事件总线
		Vue.prototype.$bus = this
	}
}).$mount('#app')
