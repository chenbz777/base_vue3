import { createRouter, createWebHistory } from 'vue-router';
import useRouteData from '@/hooks/useRouteData';


const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/home.vue')
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
        component: () => import('@/views/mobile/home.vue'),
        meta: {
          title: '首页',
          keepAlive: true
        }
      },
      {
        path: 'home2',
        name: 'mobileHome2',
        component: () => import('@/views/mobile/home2.vue'),
        meta: {
          title: '首页2',
          keepAlive: true
        }
      },
      {
        path: 'home3',
        name: 'mobileHome3',
        component: () => import('@/views/mobile/home3.vue'),
        meta: {
          title: '首页3',
          keepAlive: true
        }
      },
      {
        path: 'blank',
        name: 'mobileBlank',
        meta: {
          title: '空白页',
          keepAlive: false,
          collect: false
        },
        component: () => import('@/views/mobile/blank.vue')
      }
    ]
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
      },
      {
        path: 'blank',
        name: 'adminBlank',
        meta: {
          title: '空白页',
          keepAlive: false,
          collect: false
        },
        component: () => import('@/views/admin/blank.vue')
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

const { navigationType } = useRouteData();

const historyList = [];

router.beforeEach(async (to, from) => {

  if (from.fullPath === '/') {
    navigationType.value = 'default';
  } else {
    navigationType.value = historyList.find(path => path === to.fullPath) ? 'back' : 'push';
  }

  historyList.push(from.fullPath);

  if (historyList.find(path => path === to.fullPath)) {
    const index = historyList.findIndex(path => path === to.fullPath);

    historyList.length = index + 1;
  }

  // 通过 return turn;
  // 不通过 return false;
  return true;
});

export default router;
