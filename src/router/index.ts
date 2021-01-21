
import { createRouter, createWebHistory } from 'vue-router';

import setPermission from "@/utils/permission";

import store from "@/store/index";

import getRoutes from './config';

const whites: Array<string> = ['/', '/login']; 

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: getRoutes()
})

router.beforeEach(async (to, from, next) => {
  if (store.state.menus.length || whites.includes(to.path)) {
    next()
  } else {
    try {
      await setPermission()
      next(to)
    } catch (error) {
      console.log(error)
      next(from)
    }
  }
});

export default router
