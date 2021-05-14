import { RouteRecordRaw } from 'vue-router'

const main: Array<RouteRecordRaw> = [
  {
    path: '/main',
    name: 'main',
    component: () =>
      import(/* webpackChunkName: "main" */ '@/views/main/index.vue')
  }
]

export default main
