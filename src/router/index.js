import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";
import NProgress from "nprogress";

Vue.use(VueRouter);

const routes = [{
	path: '/',
	name: 'index',
	meta: {title: "tetto(特图)-插画分享", isAuth: true},
	component: () => import('@/components/index')
}, {
	path: "/index",
	redirect: "/"
}, , {
	path: "/404",
	name: '404',
	hidden: true,
	meta: {title: "页面飞走了", isAuth: false},
	component: () => import('@/components/404/index')
}, {
	path: "/login",
	name: "login",
	meta: {title: "登录", isAuth: false},
	component: () => import("@/components/login.vue"),
}, {
	path: "/register",
	name: "register",
	meta: {title: "注册", isAuth: false},
	component: () => import("@/components/register.vue"),
}, {
	path: '/space/:uid',
	name: 'space',
	props: true,
	meta: {title: "个人空间", isAuth: true},
	component: () => import('@/components/space/index'),
}, {
	path: '/upload',
	name: 'upload',
	meta: {title: "投稿", isAuth: true},
	component: () => import('@/components/upload/index')
}, {
	path: '/artworks/:aid',
	name: 'artworks',
	meta: {title: "作品详情", isAuth: true},
	component: () => import('@/components/artwork/artworks')
}, {
	path: '/tags/:tag',
	name: 'tags',
	meta: {title: "搜索结果", isAuth: true},
	component: () => import('@/components/search/Search')
}, {
	path: '*',
	redirect: '/404',
}];


const routerPush = VueRouter.prototype.push;


VueRouter.prototype.push = function push(location) {
	return routerPush.call(this, location).catch((error) => error);
};

const router = new VueRouter({
	mode: 'history',
	routes,
});

router.beforeEach((to, from, next) => {
	// 没有token
	if (!store.state.auth.token) {
		if (to.meta.isAuth) {
			next({path: '/login'});
		} else {
			next();
		}
	}
	next();
});

router.afterEach((to, from) => {
	document.title = to.meta.title || 'tetto(特图)-插画分享'
});

export default router;
