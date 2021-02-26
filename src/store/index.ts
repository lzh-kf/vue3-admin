import { createStore } from 'vuex'
import Store from './dataType'
import { setSession } from '@/utils/cache'

// vuex数据做持久化处理
// const setStore = (store: any) => {
//   const { state } = setSession
//   state && store.replaceState(state)
//   store.subscribe((mutation: string, state: Store) => {
//     setSession.state = state
//   })
// }

const store: Store = {
  state: {
    permissions: [],
    menus: [],
    user: {},
    routeNames: [],
    menuNames: []
  },
  mutations: {
    setPermissions(state, data) {
      state.permissions = data;
    },
    setMenus(state, data) {
      state.menus = data;
    },
    setUser(state, data) {
      state.user = data;
    },
    setRouteNames(state, data) {
      state.routeNames = data;
    },
    setMenuNames(state, data) {
      state.menuNames = data;
    }
  },
  // plugins: [setStore]
}

export default createStore(store)
