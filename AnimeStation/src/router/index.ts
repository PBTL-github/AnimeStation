import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    meta: {
      id: "0",
      title: "首页",
    },
    component: () => import("@/views/Home/index.vue"),
  },
  {
    path: "/search",
    name: "search",
    meta: {
      id: "1",
      title: "搜索",
    },
    component: () => import("@/views/Search/index.vue"),
  },
  {
    path: "/about",
    name: "about",
    meta: {
      id: "2",
      title: "关于我",
    },
    component: () => import("@/views/About/index.vue"),
  },
  {
    path: "/picture",
    name: "picture",
    meta: {
      id: "3",
      title: "图库",
    },
    component: () => import("@/views/Picture/index.vue"),
  },
  {
    path: "/setting",
    name: "setting",
    meta: {
      id: "4",
      title: "设置",
    },
    component: () => import("@/views/Setting/index.vue"),
  },
];

const router = createRouter({
  history: createWebHistory("/"),
  routes,
});

export default router;
