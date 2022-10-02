import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [{
	path: "/",
	redirect: "/index"
}, {
	path: "/login",
	name: "login",
	component: () => import("@/components/login.vue"),
}, {
	path: "/register",
	name: "register",
	component: () => import("@/components/register.vue"),
}, {
	path: '/index',
	name: 'index',
	component: () => import('@/components/index')
}, {
	path: '/space',
	name: 'space',
	component: () => import('@/components/space/index')
},{
	path: '/upload',
	name: 'upload',
	component: () => import('@/components/upload/index')
}
	
	// {
	// 	path: "/home",
	// 	name: "home",
	// 	component: () => import("../components"),
	// 	children: [
	// 		{
	// 			path: "/",
	// 			redirect: "/index",
	// 		},
	// 		{
	// 			path: "/index",
	// 			component: () => import("../components/index/Index.vue"),
	// 		},
	// 		{
	// 			path: "/goods/:id",
	// 			component: () => import("../components/goods/GoodsInfo.vue"),
	// 		},
	// 		{
	// 			path: "/shoppingcar",
	// 			component: () => import("../components/shoppingcar/Shoppingcar.vue"),
	// 		},
	// 		{
	// 			path: "/order",
	// 			component: () => import("../components/order/Order.vue"),
	// 		},
	// 	],
	// },
];

const routerPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
	return routerPush.call(this, location).catch((error) => error);
};

const router = new VueRouter({
	mode: 'history',
	routes,
});

export default router;
