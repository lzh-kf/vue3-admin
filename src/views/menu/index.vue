<template>
  <el-container>
    <el-header style="min-width: 1400px">
      <el-row class="row">
        <el-col
          :span="2"
          :xl="2"
          :lg="2"
          :md="2"
          :sm="2"
          class="column"
          v-show="!collapse"
        >
          <img src="@/assets/image/logo.png" alt="" />
          <span class="title">admin-system</span>
        </el-col>
        <el-col
          :span="15"
          :xl="15"
          :lg="15"
          :md="6"
          :sm="6"
          class="column set-menu-btn"
        >
          <div @click="setCollapse">
            <span v-show="!collapse"
              ><i class="iconfont icon-open-right-blue"></i
            ></span>
            <span v-show="collapse"
              ><i class="iconfont icon-open-right-blue-copy"></i
            ></span>
          </div>
        </el-col>
        <el-col
          :span="2"
          :xl="2"
          :lg="2"
          :md="2"
          :sm="2"
          class="column"
          v-show="collapse"
        >
        </el-col>
        <el-col :span="3" :xl="3" :lg="3" :md="6" :sm="6" class="column">
          <searchMenu />
        </el-col>
        <el-col :span="4" :xl="4" :lg="4" :md="6" :sm="6" class="column right">
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
        <custom-menus
          :menus="menus"
          :collapse="collapse"
          id="custom-menu"
          @getNames="getNames"
        ></custom-menus>
      </el-aside>
      <el-main>
        <div class="bottom-border">
          <el-breadcrumb separator="/" class="breadcrumb" v-if="navs.length">
            <el-breadcrumb-item v-for="(item, index) in navs" :key="index">{{
              item
            }}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <router-view />
      </el-main>
    </el-container>
    <el-backtop target=".el-main" :bottom="100"> </el-backtop>
    <setThemeColor ref="setThemeColor" />
  </el-container>
</template>

<script lang="ts">
import { logout } from '@/apis/login'

import { Data } from './interface'

import { ElMessageBox } from 'element-plus'

import { useRouter } from 'vue-router'

import { useStore } from 'vuex'

import { setSession } from '@/utils/cache'

import { defineComponent, reactive, toRefs, computed, ref } from 'vue'

import setThemeColor from './components/model/index.vue'

import searchMenu from './components/searchMenu/index.vue'

export default defineComponent({
  components: {
    setThemeColor,
    searchMenu,
  },
  setup() {
    const router = useRouter()

    const store = useStore()

    const data = reactive<Data>({
      navs: setSession.names || ['用户中心', '用户管理'],
      collapse: false,
    })

    const setThemeColor = ref()

    const user = computed(() => store.state.user)

    const menus = computed(() => store.state.menus)

    const asideWidth = computed(() => (data.collapse ? '64px' : '180px'))

    const removeData = () => {
      store.state.routeNames.forEach((name: string) => {
        router.removeRoute(name)
      })
      sessionStorage.clear()
      setThemeColor.value.setThemeColor('#409eff')
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

    const getNames = (names: Array<string>) => {
      data.navs = setSession.names = names
    }

    const setCollapse = (): void => {
      data.collapse = !data.collapse
    }

    return {
      ...toRefs(data),
      asideWidth,
      user,
      menus,
      logoutSystem,
      setThemeColor,
      changeThemeColor,
      getNames,
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
    margin-bottom: 15px;
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
