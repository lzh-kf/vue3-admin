<template>
  <div class="menus">
    <el-menu
      style="height: 100%"
      :unique-opened="true"
      :default-active="$route.path"
      :router="true"
      :collapse="collapse"
    >
      <template v-for="(item, index) in menus" :key="index">
        <template v-if="item.children">
          <submenu :child="item" />
        </template>
        <el-menu-item v-else :index="item.path">
          <i :class="`iconfont ${item.icon}`"></i>
          <template #title>{{ item.menuName }}</template>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import submenu from './submenu.vue'
export default defineComponent({
  name: 'menus',
  components: { submenu },
  props: {
    menus: {
      type: Array,
      required: true,
    },
    collapse: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
})
</script>

<style lang="scss" scoped>
.menus {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
}
</style>
