<template>
  <div>
    <el-dialog title="切换主题色" v-model="visible" width="30%">
      <div class="content">
        <div style="margin-bottom: 20px">
          <el-color-picker v-model="color"></el-color-picker>
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
import { Data } from './dataType'
import setThemeColor from '@/utils/setThemeColor'
import { defaultThemeColor } from '@/utils/const'
export default defineComponent({
  name: 'setThemeColor',
  setup() {
    const data = reactive<Data>({
      visible: false,
      color: defaultThemeColor,
    })

    const setLocalColor = (): void => {
      setLocal.themeColor = data.color
      setThemeColor()
    }

    onMounted(() => {
      setThemeColor()
      const { themeColor } = setLocal
      if (themeColor) {
        data.color = themeColor
      }
    })

    const setVisible = (value: boolean): void => {
      data.visible = value
    }

    const handleConfirm = (): void => {
      setLocalColor()
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
      setThemeColor,
    }
  },
})
</script>

<style lang="scss" scoped>
.content {
  text-align: center;
}
</style>