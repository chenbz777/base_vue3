import { createApp } from 'vue';
import App from './App.vue';
import router from './router';  // 路由
import 'animate.css';  // 引入animate动画样式
import 'element-plus/dist/index.css';


const app = createApp(App);

app.use(router);

// 自动导入并注册 `components` 文件夹下的所有 `.vue` 文件
const components = import.meta.glob('@/components/*.vue', { eager: true });

Object.entries(components).forEach(([path, component]) => {
  const componentName = path.split('/').pop().replace(/\.\w+$/, ''); // 提取文件名作为组件名
  app.component(componentName, component.default);
});

app.mount('#app');
