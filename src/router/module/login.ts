import { RouteRecordRaw } from 'vue-router';

const login: Array<RouteRecordRaw> = [
  {
    path: "/login",
    name: "login",
    component: () => import(/* webpackChunkName: "login" */ "@/views/login/index.vue")
  },
  {
    path: "/",
    redirect: "/login"
  }
]

export default login;
