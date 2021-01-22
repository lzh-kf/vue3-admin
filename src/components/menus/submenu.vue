<template>
  <div>
    <el-submenu :index="child.path">
      <template #title>
        <i :class="`iconfont ${child.icon}`"></i>
        {{ child.menuName }}</template
      >
      <div v-for="(item, index) in child.children" :key="index">
        <el-menu-item
          v-if="!item.children"
          :index="item.path"
          @click="handleClick(item.menuName, child.menuName)"
        >
          <i :class="`iconfont ${item.icon}`"></i>
          {{ item.menuName }}
        </el-menu-item>
        <submenu :child="item" v-else @emitParent="emitParent" />
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
  setup(props, ctx) {
    const handleClick = (menuName: string, parentMenuName: string) => {
      const names: Array<string> = [parentMenuName, menuName]
      ctx.emit('emitParent', names)
      ctx.emit('getNames', names)
    }

    const emitParent = (names: Array<string>) => {
      const tempdata: Array<string> = [props.child.menuName, ...names]
      ctx.emit('emitParent', tempdata)
      ctx.emit('getNames', tempdata)
    }
    return {
      handleClick,
      emitParent,
    }
  },
})
</script>

<style lang="scss" scoped></style>
