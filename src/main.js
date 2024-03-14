import { createApp } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';

// 路由
import router from './router';

// element-puls 库
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import zhCn from 'element-plus/dist/locale/zh-cn.mjs';

// 引入animate动画样式
import 'animate.css';

const pinia = createPinia();

const app = createApp(App);

app.use(pinia);
app.use(router);
app.use(ElementPlus, {
  locale: zhCn
});
app.mount('#app');
