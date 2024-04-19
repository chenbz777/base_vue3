import { nextTick } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import useRouterPlus from '@/hooks/useRouterPlus';


const { getCurrentPageThumbnail } = useRouterPlus();

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


router.beforeEach(async (to, from) => {

  // 通过 return turn;
  // 不通过 return false;
  return true;
});

// 路由后置守卫: 用于截图
router.afterEach((to, from) => {
  nextTick(() => {
    setTimeout(() => {
      getCurrentPageThumbnail(to.fullPath);
    }, 600);
  });
});

export default router;
