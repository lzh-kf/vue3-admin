<template>
  <div class="login">
    <div class="content">
      <h4>admin-system</h4>
      <el-form
        :model="formData"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="账号" prop="userAccount">
          <el-input
            v-model="formData.userAccount"
            placeholder="请输入账号"
            clearable
          >
            <template #prefix><i class="iconfont icon-zhanghao"></i></template>
          </el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="formData.password"
            type="password"
            placeholder="请输入密码"
            @keyup.enter="submitForm()"
            clearable
          >
            <template #prefix><i class="iconfont icon-mima"></i></template
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm()" style="width: 100%"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs, onMounted } from 'vue'
import { login } from '@/apis/login'
import { setSession } from '@/utils/cache'
import { Data, FormData } from './dataType'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'
import blueimpmd5 from 'blueimp-md5'
import setThemeColor from '@/utils/setThemeColor'
export default defineComponent({
  setup() {
    const ruleForm = ref()
    const router = useRouter()
    const route = useRoute()
    const store = useStore()
    const data = reactive<Data>({
      formData: {
        userAccount: 'admin',
        password: 'a123456',
      },
      rules: {
        userAccount: [
          {
            required: true,
            message: '请输入账号',
            trigger: 'blur',
          },
        ],
        password: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur',
          },
        ],
      },
    })

    const setParam = (): FormData => {
      const param: FormData = { ...data.formData }
      param.password = blueimpmd5(param.password)
      return param
    }

    const handleLogin = () => {
      login(setParam()).then((response) => {
        const { userInfo, token } = response.data
        setSession.token = token
        setSession.user = userInfo
        store.commit('setUser', userInfo)
        router.push({
          path: '/user/user',
        })
      })
    }

    const submitForm = () => {
      ruleForm.value.validate((valid: boolean) => {
        valid && handleLogin()
      })
    }

    const setAccountInfo = () => {
      const query = route.query
      if (Object.keys(query).length) {
        data.formData.userAccount = query.userAccount as string
        data.formData.password = query.password as string
      }
    }

    setAccountInfo()

    onMounted(() => {
      setThemeColor()
    })

    return {
      ...toRefs(data),
      ruleForm,
      submitForm,
    }
  },
})
</script>

<style lang="scss" scoped>
.login,
.content,
h4 {
  display: flex;
  align-items: center;
  justify-content: center;
}
.login {
  width: 100vw;
  height: 100vh;
  background: url('../../assets/image/background.png') center no-repeat;
  background-size: auto;
  .content {
    flex-wrap: wrap;
    .demo-ruleForm {
      width: 340px;
    }
    h4 {
      width: 100%;
      padding-left: 74px;
      margin-bottom: 20px;
    }
  }
}
</style>
