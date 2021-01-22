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
          <submenu :child="item" @getNames="getNames" />
        </div>
        <el-menu-item
          v-else
          :index="item.path"
          @click="handleClick(item.menuName)"
        >
          <template #title>
            <div>
              <i :class="`iconfont ${item.icon}`"></i>
              <span>{{ item.menuName }}</span>
            </div>
          </template>
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
  setup(props, ctx) {
    const getNames = (names: Array<string>) => {
      ctx.emit('getNames', names)
    }

    const handleClick = (menuName: string) => {
      getNames([menuName])
    }

    return {
      handleClick,
      getNames,
    }
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
