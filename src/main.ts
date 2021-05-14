import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import common from '@/common'

const app = createApp(App)

// 注册公共方法以及组件
common(app)

app.use(store).use(router).mount('#app')

export default app
