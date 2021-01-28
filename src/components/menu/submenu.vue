<template>
  <el-submenu :index="child.path">
    <template #title>
      <i :class="`iconfont ${child.icon}`"></i>
      <span>{{ child.menuName }}</span></template
    >
    <template v-for="(item, index) in child.children" :key="index">
      <submenu v-if="item.children" :child="item" />
      <el-menu-item v-else :index="item.path">
        <i :class="`iconfont ${item.icon}`"></i>
        {{ item.menuName }}
      </el-menu-item>
    </template>
  </el-submenu>
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
