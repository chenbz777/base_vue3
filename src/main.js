import { createApp } from 'vue';
import App from './App.vue';
import router from './router';  // 路由
import 'animate.css';  // 引入animate动画样式
import 'element-plus/dist/index.css';
import 'vant/lib/index.css';
import AnimateTransition from '@/components/AnimateTransition.vue';  // 引入AnimateTransition组件
import AnimateTransitionGroup from '@/components/AnimateTransitionGroup.vue';  // 引入AnimateTransitionGroup组件


const app = createApp(App);

app.use(router);

// 注册全局组件
app.component('AnimateTransition', AnimateTransition);
app.component('AnimateTransitionGroup', AnimateTransitionGroup);

app.mount('#app');
