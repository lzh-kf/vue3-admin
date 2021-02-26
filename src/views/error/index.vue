<template>
  <div class="error">
    <img src="../../assets/image/404.png" alt="404" />
    <p>页面路径匹配错误</p>
    <el-button type="primary" @click="goBack" style="margin-left: 10px">返回上一级</el-button>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
export default defineComponent({
  setup() {
    const Router = useRouter()

    const goBack = () => {
      Router.go(-1)
    }
    return {
      goBack,
    }
  },
})
</script>

<style lang="scss" scoped>
.error {
  width: 100vw;
  height: 100vh;
  flex-wrap: wrap;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  img {
    width: 380px;
  }
}
</style>