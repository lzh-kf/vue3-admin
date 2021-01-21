<template>
  <div class="menus">
    <el-menu
      style="height: 100%"
      :unique-opened="true"
      :default-active="$route.path"
      :router="true"
    >
      <div v-for="(item, index) in menus" :key="index">
        <div v-if="item.children">
          <submenu :child="item" />
        </div>
        <el-menu-item v-else :index="item.path">
          <template #title
            ><span>{{ item.menuName }}</span></template
          >
        </el-menu-item>
      </div>
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
  },
})
</script>

<style lang="scss" scoped>
.menus {
  padding-top: 20px;
  box-sizing: border-box;
  width: 100%;
  height: calc(100% - 20px);
  overflow-x: hidden;
}
</style>
