<script setup>
import AdminAside from './components/AdminAside.vue';
import MainHead from './components/MainHead.vue';
import { useRoute } from 'vue-router';
import useRouterPlus from '@/hooks/useRouterPlus';
import RouteTabs from './components/RouteTabs.vue';


const route = useRoute();

const { keepAliveList, formatComponentInstance } = useRouterPlus();
</script>

<template>
  <div class="admin">
    <!-- 侧边菜单区域 -->
    <div class="admin__aside">
      <AdminAside />
    </div>

    <!-- 内容区域 -->
    <div class="admin__main">
      <!-- 内容顶部区域 -->
      <MainHead class="admin__main__head" />
      <RouteTabs />

      <div class="admin__main__content">
        <!-- <router-view></router-view> -->

        <router-view v-slot="{ Component }">
          <AnimateTransition>
            <keep-alive :include="keepAliveList.filter(item => item.meta.keepAlive).map(item => item.fullPath)">
              <component :is="formatComponentInstance(Component, route)" :key="route.fullPath" />
            </keep-alive>
          </AnimateTransition>
        </router-view>
      </div>
    </div>
  </div>
</template>

<style scoped>
.admin {
  display: flex;
  background-color: var(--theme-page-color);
}

.admin__aside {
  position: relative;
  height: 100vh;
  padding: 10px 6px;
  overflow-x: hidden;
  overflow-y: auto;
  background-color: var(--menu-bg-color);
}

.admin__main {
  flex: 1;
  width: 0;
}

.admin__main__head {
  background-color: var(--theme-page-color);
}

.admin__main__content {
  padding: 20px;
  height: calc(100vh - 60px);
  overflow: auto;
}
</style>
