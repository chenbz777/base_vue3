import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/home.vue')
  },
  {
    path: '/admin/login',
    name: 'adminLogin',
    component: () => import('@/views/admin/login.vue')
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('@/views/admin/index.vue'),
    meta: {
      title: '后台管理'
    },
    redirect: '/admin/home',
    children: [
      {
        path: 'home',
        name: 'adminHome',
        component: () => import('@/views/admin/home.vue'),
        meta: {
          title: '仪表盘',
          keepAlive: true
        }
      },
      {
        path: 'home2/:id',
        name: 'adminHome2',
        component: () => import('@/views/admin/home2.vue'),
        meta: {
          title: '仪表盘2',
          keepAlive: true
        }
      }
    ]
  },
  {
    path: '/:pathMatch(.*)',
    name: '404',
    component: () => import('@/views/404.vue')
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
