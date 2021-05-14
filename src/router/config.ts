import { RouteRecordRaw } from 'vue-router'
import { __spreadArray } from 'tslib'

function getRoutes(): Array<RouteRecordRaw> {
  const files = require.context('./module', false, /\.ts$/)
  const routes: Array<RouteRecordRaw> = []
  files.keys().forEach((key: string) => {
    const currentRoute: Array<RouteRecordRaw> = files(key).default
    __spreadArray(routes, currentRoute)
  })
  return routes
}

export default getRoutes
