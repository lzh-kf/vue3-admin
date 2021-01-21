<template>
  <div>
    <el-dialog title="切换主题色" v-model="visible" width="30%">
      <div class="content">
        <div style="margin-bottom: 20px">
          <input type="color" v-model="color" />
        </div>
        <el-button @click="handleCancel">取 消</el-button>
        <el-button type="primary" @click="handleConfirm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted } from 'vue'
import { setLocal } from '@/utils/cache'
import { Data, DomElement } from './dataType'
export default defineComponent({
  name: 'setThemeColor',
  setup() {
    const data = reactive<Data>({
      visible: false,
      color: '#409EFF',
    })

    const setThemeColor = (color?: string): void => {
      const style: DomElement = document.querySelector('head style')
      if (style) {
        style.innerText = `:root {--theme-color: ${color || data.color};}`
        setLocal.themeColor = data.color
      }
    }

    onMounted(() => {
      const { themeColor } = setLocal
      if (themeColor) {
        data.color = themeColor
        setThemeColor()
      }
    })

    const setVisible = (value: boolean): void => {
      data.visible = value
    }

    const handleConfirm = (): void => {
      setThemeColor()
      setVisible(false)
    }

    const handleCancel = (): void => {
      setVisible(false)
    }

    return {
      ...toRefs(data),
      handleCancel,
      handleConfirm,
      setVisible,
      setThemeColor
    }
  },
})
</script>

<style lang="scss" scoped>
.content {
  text-align: center;
}
</style>