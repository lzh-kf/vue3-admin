<template>
  <el-container>
    <el-header>
      <el-row class="row">
        <el-col :span="12" class="column">
          <img src="@/assets/image/logo.png" alt="" />
        </el-col>
        <el-col :span="12" class="column right">
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
      <el-aside width="180px">
        <custom-menus :menus="menus" id="custom-menu"></custom-menus>
      </el-aside>
      <el-main>
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

import { defineComponent, reactive, toRefs, computed, ref } from 'vue'

import setThemeColor from './components/model.vue'

export default defineComponent({
  components: {
    setThemeColor,
  },
  setup() {
    const router = useRouter()

    const store = useStore()

    const data = reactive<Data>({
      navs: [],
    })

    const setThemeColor = ref()

    const user = computed(() => store.state.user)

    const menus = computed(() => store.state.menus)

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
      ElMessageBox.confirm('确认退出系统吗?', '确认框', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
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

    return {
      ...toRefs(data),
      user,
      menus,
      logoutSystem,
      setThemeColor,
      changeThemeColor,
    }
  },
})
</script>

<style lang="scss">
.el-aside {
  height: calc(100vh - 60px);
}
.el-main {
  padding: 30px 15px 10px 10px;
  box-sizing: border-box;
  height: calc(100vh - 60px);
  .nav {
    margin: 10px 0 10px 0x;
    border-bottom: 1px solid #e6e6e6;
  }
  .place {
    margin-bottom: 15px;
  }
}
.el-header {
  background: var(--theme-color);
  color: white;
  font-size: 13px;
  .row {
    height: 100%;
    .column {
      height: 100%;
      display: flex;
      align-items: center;
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
