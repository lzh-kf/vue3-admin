import { createStore } from 'vuex';
import Store from './dataType';

const store: Store = {
  state: {
    permissions: [],
    menus: [],
    user: {},
    routeNames: []
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
    }
  }
}

export default createStore(store)
