<template>
  <div>
    <el-submenu :index="child.path">
      <template #title>
        <i :class="`iconfont ${child.icon}`"></i>
        {{ child.menuName }}</template
      >
      <div v-for="(item, index) in child.children" :key="index">
        <el-menu-item v-if="!item.children" :index="item.path">
          <i :class="`iconfont ${item.icon}`"></i>
          {{ item.menuName }}
        </el-menu-item>
        <submenu :child="item" v-else />
      </div>
    </el-submenu>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'submenu',
  props: {
    child: {
      type: Object,
      required: true,
    },
  },
})
</script>

<style lang="scss" scoped></style>
