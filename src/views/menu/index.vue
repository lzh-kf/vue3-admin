<template>
  <el-container>
    <el-header>
      <el-row class="row">
        <el-col :span="2" class="column" v-show="!collapse">
          <img src="@/assets/image/logo.png" alt="" />
          <span class="title">admin-system</span>
        </el-col>
        <el-col :span="15" class="column set-menu-btn">
          <div @click="setCollapse">
            <span v-show="!collapse"
              ><i class="iconfont icon-open-right-blue"></i
            ></span>
            <span v-show="collapse"
              ><i class="iconfont icon-open-right-blue-copy"></i
            ></span>
          </div>
        </el-col>
        <el-col :span="2" class="column" v-show="collapse"> </el-col>
        <el-col :span="3" class="column">
          <searchMenu />
        </el-col>
        <el-col :span="4" class="column right">
          <el-button
            @click="changeThemeColor"
            type="text"
            class="change-theme-color"
            >切换主题色</el-button
          >
          <span>当前用户 {{ user.userName }}</span>
          <el-button type="text" @click="logoutSystem" class="exit"
            >退出</el-button
          >
        </el-col>
      </el-row>
      <div class="place"></div
    ></el-header>
    <el-container>
      <el-aside :width="asideWidth">
        <custom-menu :menus="menus" :collapse="collapse"></custom-menu>
      </el-aside>
      <el-main>
        <div class="bottom-border">
          <el-breadcrumb separator="/" class="breadcrumb" v-if="navs.length">
            <el-breadcrumb-item v-for="(item, index) in navs" :key="index">{{
              item
            }}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <router-view aaa="123456" />
      </el-main>
    </el-container>
    <el-backtop target=".el-main" :bottom="100"> </el-backtop>
    <setThemeColor ref="setThemeColor" />
  </el-container>
</template>

<script lang="ts">
import { logout } from '@/apis/login'

import { Data } from './dataType'

import { ElMessageBox } from 'element-plus'

import { useRouter, useRoute } from 'vue-router'

import { useStore } from 'vuex'

import { setSession } from '@/utils/cache'

import {
  defineComponent,
  reactive,
  toRefs,
  computed,
  ref,
  watch,
  onUnmounted,
} from 'vue'

import setThemeColor from './components/model/index.vue'

import searchMenu from './components/searchMenu/index.vue'

import { defaultThemeColor } from '@/utils/const'

import eventLister from '@/eventLister'

export default defineComponent({
  components: {
    setThemeColor,
    searchMenu,
  },
  setup() {
    const router = useRouter()

    const route = useRoute()

    const store = useStore()

    const data = reactive<Data>({
      navs: [],
      collapse: false,
    })

    const setThemeColor = ref()

    const user = computed(() => store.state.user)

    const menus = computed(() => store.state.menus)

    const asideWidth = computed(() => (data.collapse ? '' : '180px'))

    const removeData = () => {
      store.state.routeNames.forEach((name: string) => {
        router.removeRoute(name)
      })
      router.removeRoute('error')
      sessionStorage.clear()
      setThemeColor.value.setThemeColor(defaultThemeColor)
      localStorage.clear()
      store.commit('setRouteNames', [])
      store.commit('setPermissions', [])
      store.commit('setMenus', [])
      store.commit('setUser', {})
    }

    const logoutSystem = (): void => {
      ElMessageBox.confirm('确定退出该系统吗?', '退出确认框', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info',
      }).then(() => {
        logout().then(() => {
          removeData()
          router.replace({
            path: '/',
          })
        })
      })
    }

    const changeThemeColor = () => {
      setThemeColor.value.setVisible(true)
    }

    const setCollapse = (): void => {
      data.collapse = !data.collapse
    }

    const getMenuNames = (path: string, data = store.state.menus) => {
      const result: Array<string> = []
      for (let i = 0; i < data.length; i++) {
        const item = data[i]
        if (item.path === path || item.menuId === path) {
          result.unshift(item.menuName)
          if (item.parentId !== 0) {
            result.unshift(...getMenuNames(item.parentId))
          }
        } else if (item.children) {
          result.unshift(...getMenuNames(path, item.children))
        }
      }
      return result
    }

    const setNavs = () => {
      if (setSession.names) {
        data.navs = setSession.names
      } else {
        setSession.names = data.navs = getMenuNames(route.path)
      }
    }

    const emitEvent = () => {
      eventLister.emit('getName', data.navs[data.navs.length - 1])
    }

    onUnmounted(() => {
      eventLister.unResgiterEvent('getName')
    })

    setNavs()

    emitEvent()

    watch(
      () => route.path,
      (path) => {
        setSession.names = data.navs = getMenuNames(path)
        emitEvent()
      }
    )

    return {
      ...toRefs(data),
      asideWidth,
      user,
      menus,
      logoutSystem,
      setThemeColor,
      changeThemeColor,
      setCollapse,
    }
  },
})
</script>

<style lang="scss">
.el-aside {
  height: calc(100vh - 60px);
}
.el-main {
  padding: 0px 15px 10px 10px;
  box-sizing: border-box;
  height: calc(100vh - 60px);
  .bottom-border {
    position: sticky;
    padding-top: 15px;
    top: 0;
    box-sizing: border-box;
    width: 100%;
    z-index: 1;
    border-bottom: 1px solid #eaeefb;
    margin-bottom: 20px;
    background: #fff;
    .breadcrumb {
      margin: 0 0 15px 0;
      cursor: pointer;
    }
  }
}
.el-header {
  background: var(--theme-color);
  color: #fff;
  font-size: 13px;
  .row {
    height: 100%;
    .column {
      height: 100%;
      display: flex;
      align-items: center;
      .title {
        margin-left: 10px;
      }
    }
    .set-menu-btn {
      padding-left: 6.5px;
      box-sizing: border-box;
      cursor: pointer;
    }
    .right {
      justify-content: flex-end;
      span {
        color: white;
        margin-right: 10px;
      }
    }
  }
  img {
    width: 25px;
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
