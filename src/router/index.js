import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/home.vue'),
    // 重定向
    redirect: '/mobile'
  },
  {
    path: '/mobile',
    name: 'mobile',
    component: () => import('@/views/mobile/index.vue'),
    redirect: '/mobile/home',
    children: [
      {
        path: 'home',
        name: 'mobileHome',
        component: () => import('@/views/mobile/home.vue')
      },
      {
        path: 'home2',
        name: 'mobileHome2',
        component: () => import('@/views/mobile/home2.vue')
      }
    ]
  }
  // {
  //   path: '/:pathMatch(.*)',
  //   name: '404',
  //   component: () => import('@/views/404.vue')
  // }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
