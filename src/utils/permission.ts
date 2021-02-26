import { queryPermission } from "@/apis/login";
import { RouteRecordRaw } from 'vue-router';
import router from '@/router/index';
import store from '@/store/index';
import { setSession } from "@/utils/cache";

interface Menus {
    [key: string]: unknown;
}

type Permission = Menus;

type Route = Menus;

interface MenusAndPermission {
    menus: Array<Menus>;
    routes: Array<Menus>;
    menuNames: Array<Menus>;
    routeNames: Array<string>;
}

function savePermissionInfo(menus: Array<Menus>, permissions: Array<string>, routeNames: Array<string>, menuNames: Array<Menus>): void {
    store.commit("setPermissions", permissions);
    store.commit("setMenus", menus);
    store.commit("setRouteNames", routeNames);
    store.commit("setUser", setSession.user);
    store.commit("setMenuNames", menuNames);
}

function addErrorRoute(): void {
    router.addRoute({
        path: "/:afterUser(.*)",
        name: "error",
        component: () => import(/* webpackChunkName: "error" */ "@/views/error/index.vue")
    });
}

function saveRoute(data: Array<Route>): void {
    const { length } = data;
    for (let i = 0; i < length; i++) {
        const item = data[i];
        const route: RouteRecordRaw = {
            path: item.path as string,
            name: item.path as string,
            component: () => import(`@/views${item.componentFilePath}/index.vue`)
        };
        router.addRoute('menu', route);
        addErrorRoute();
    }
}

function getPermission(data: Array<Permission>): Array<string> {
    return data.map(item => item.action) as Array<string>;
}

function setTreeData(data: Array<Menus>): void {
    const { length } = data;
    for (let i = 0; i < length; i++) {
        const item = data[i];
        for (let j = 0; j < length; j++) {
            const currentItem = data[j];
            if (item.menuId === currentItem.parentId) {
                item.children = item.children || [];
                (item.children as Array<any>).push(currentItem);
            }
        }
    }
}

function getMenusAndRoutes(data: Array<Menus>): MenusAndPermission {
    const menus: Array<Menus> = [];
    const routes: Array<Menus> = [];
    const menuNames: Array<Menus> = [];
    const routeNames: Array<string> = [];
    setTreeData(data);
    const { length } = data;
    for (let i = 0; i < length; i++) {
        const item = data[i];
        if (item.parentId === 0) {
            menus.push(item);
        }
        if (!item.children) {
            routes.push(item);
            menuNames.push({
                label: item.menuName,
                path: item.path
            })
            routeNames.push(item.componentFilePath as string);
        }
    }
    return { menus, routes, routeNames, menuNames };
}


function setPermission(): Promise<unknown> {
    return new Promise((resolve, reject) => {
        queryPermission().then(res => {
            const { menus, routes, routeNames, menuNames } = getMenusAndRoutes(res.data.menus);
            const permissions = getPermission(res.data.permissions);
            savePermissionInfo(menus, permissions, routeNames, menuNames);
            saveRoute(routes);
            resolve(true);
        }).catch(error => {
            reject(error)
        });
    })
}

export default setPermission;
