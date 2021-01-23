import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import 'normalize.css';
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import locale from 'element-plus/lib/locale/lang/zh-cn';
import registrationComponents from "@/components/index";
import registrationDirectives from "@/directives";
import '@/assets/css/element-theme/index.css';
import 'element-plus/lib/theme-chalk/base.css';
import '@/assets/css/base.css';

const app = createApp(App);

registrationComponents(app);

registrationDirectives(app);

app.use(store);

app.use(router);

app.use(ElementPlus, { size: 'small', zIndex: 3000, locale });

app.mount('#app');

export default app;

