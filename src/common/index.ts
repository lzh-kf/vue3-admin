import { App } from 'vue'
import registerCustomComponent from '@/components'
import registerCustomDerective from '@/directives'
import registerElementComponent from './element.config'
import 'normalize.css'
import 'nprogress/nprogress.css'
import 'element-plus/lib/theme-chalk/index.css'
import '@/assets/css/element-theme/index.css'
import '@/assets/css/base.css'

// 公共注册全局方法
export default function(app: App<Element>): void {
  // 注册自定义全局组件
  registerCustomComponent(app)
  // 注册全局element的组件
  registerElementComponent(app)
  // 注册自定义指令
  registerCustomDerective(app)
}
