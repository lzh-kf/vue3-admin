import { createRouter, createWebHistory } from 'vue-router'
import setPermission from '@/utils/permission'
import store from '@/store/index'
import getRoutes from './config'
import NProgress from 'nprogress'
import { fullScreenLoading } from '@/utils'

const whites: Array<string> = ['/', '/login']

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: getRoutes()
})

router.beforeEach(async (to, from) => {
  fullScreenLoading?.open()
  NProgress.configure({ showSpinner: false })
  NProgress.start()
  if (store.state.menus.length || whites.includes(to.path)) {
    return true
  } else {
    try {
      await setPermission()
      return { ...to, replace: true }
    } catch (error) {
      return { ...from, replace: true }
    }
  }
})

router.afterEach(() => {
  fullScreenLoading?.close()
  NProgress.done()
})

export default router
