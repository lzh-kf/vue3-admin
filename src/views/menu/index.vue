<template>
  <el-container>
    <el-aside width="180px">
      <custom-menus :menus="menus" id="custom-menu"></custom-menus>
    </el-aside>
    <el-main>
      <div class="header">
        <span class="name">当前用户：{{ user.userName }}</span>
        <el-button @click="logoutSystem">退出</el-button>
      </div>
      <!-- <div class="nav">
        <ul>
          <li
            v-for="(item, index) in navs"
            :key="item.path"
            :class="index === navs.length - 1 ? 'heightLight' : ''"
            @click="nav(index === navs.length - 1, item.path)"
          >
            {{ item.name
            }}<span class="line" v-if="index < navs.length - 1">/</span>
          </li>
        </ul>
      </div> -->
      <div class="place"></div>
      <router-view />
    </el-main>
    <el-backtop target=".el-main" :bottom="100"> </el-backtop>
  </el-container>
</template>

<script lang="ts">
import { logout } from "@/apis/login";

import { Data, Menu, Result } from "./interface";

import { ElMessageBox } from "element-plus";

import { useRouter, useRoute } from "vue-router";

import { useStore } from "vuex";

import { findParentElement } from "@/utils";

import { defineComponent, reactive, ref, toRefs, computed, watch } from "vue";

export default defineComponent({
  setup() {
    const router = useRouter();

    const route = useRoute();

    const store = useStore();

    const data: Data = reactive({
      navs: [],
    });

    const user = computed(() => store.state.user);

    const menus = computed(() => store.state.menus);

    const findName = (data: Array<Menu>, path: string): Array<Result> => {
      const result = [];
      const { length } = data;
      for (let i = 0; i < length; i++) {
        const item = data[i];
        if (item.path === path) {
          result.push({
            path: item.path,
            name: item.menuName,
            menuId: item.menuId,
            parentId: item.parentId,
          });
        } else if (item.children && item.children.length) {
          result.push(...findName(item.children, path));
        }
      }
      return result;
    };

    const setNavs = () => {
      // const result: Array<Result> = findName(menus, route.path);
      // const parentElement = findParentElement(menus, result[0].parentId, menus);
      // result.unshift(...parentElement);
      // data.navs = result;
    };
    setNavs();
    watch(
      () => route.path,
      () => {
        setNavs();
      }
    );

    const removeData = () => {
      store.state.routeNames.forEach((name: string) => {
        router.removeRoute(name);
      });
      sessionStorage.clear();
      store.commit("setRouteNames", []);
      store.commit("setPermissions", []);
      store.commit("setMenus", []);
      store.commit("setUser", {});
    };

    const logoutSystem = (): void => {
      ElMessageBox.confirm("确认退出系统吗?", "确认框", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        logout().then(() => {
          removeData();
          router.replace({
            path: "/",
          });
        });
      });
    };
    return {
      ...toRefs(data),
      user,
      menus,
      logoutSystem,
    };
  },
});
</script>

<style lang="scss">
.el-aside {
  height: 100vh;
}
.el-main {
  padding: 10px 15px;
  box-sizing: border-box;
  height: 100vh;
  .nav {
    margin: 10px 0 10px 0x;
    border-bottom: 1px solid #e6e6e6;
  }
  .place {
    margin-bottom: 15px;
  }
  .header {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    .name {
      margin-right: 20px;
      font-family: "Helvetica Neue", Helvetica, "PingFang SC",
        "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
      font-size: 13px;
      font-weight: 600;
      color: #303133;
    }
  }
}
</style>
<style lang="scss" scoped>
ul {
  list-style-type: none;
  display: flex;
  font-size: 13px;
  color: #606266;
  li {
    .line {
      margin: 0 5px;
    }
  }
  .heightLight {
    color: #303133;
    font-weight: 700;
    cursor: pointer;
  }
}
</style>