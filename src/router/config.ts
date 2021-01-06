import { RouteRecordRaw } from 'vue-router';

function getRoutes(): Array<RouteRecordRaw> {
  const files = require.context("./module", false, /\.ts$/);
  let routes: Array<RouteRecordRaw> = [];
  files.keys().forEach((key: string) => {
    routes.push(...files(key).default);
  });
  return routes;
}

export default getRoutes;
