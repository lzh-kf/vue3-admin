import { RouteRecordRaw } from 'vue-router'

const menu: Array<RouteRecordRaw> = [
  {
    path: "/menu",
    name: "menu",
    component: () => import(/* webpackChunkName: "menu" */ "@/views/menu/index.vue")
  }
];

export default menu;
