<script setup>
import AdminAside from './components/AdminAside.vue';
import MainHead from './components/MainHead.vue';
import { useRoute } from 'vue-router';
import useRouterPlus from '@/hooks/useRouterPlus';
import RouteTabs from './components/RouteTabs.vue';


const route = useRoute();

const { adminKeepAliveList, formatComponentInstance } = useRouterPlus();
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

        <div class="admin__main__content__body">
          <router-view v-slot="{ Component }">
            <AnimateTransition>
              <keep-alive :include="adminKeepAliveList.filter(item => item.meta.keepAlive).map(item => item.fullPath)">
                <component :is="formatComponentInstance(Component, route)" :key="route.fullPath" />
              </keep-alive>
            </AnimateTransition>
          </router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.admin {
  display: flex;
  background-color: var(--bg-base-color);
  color: var(--text-base-color);
}

.admin__aside {
  position: relative;
  height: 100vh;
  padding: var(--p-1);
  overflow-x: hidden;
  overflow-y: auto;
  background-color: var(--bg-secondary-color);
  border-right: 1px solid var(--border-base-color);
}

.admin__main {
  flex: 1;
  width: 0;
}

.admin__main__head {
  background-color: var(--bg-base-color);
}

.admin__main__content {
  padding: var(--p-2);
  height: calc(100vh - 60px - 42px);
  overflow: auto;
  background-color: var(--bg-secondary-color);
}

.admin__main__content__body {
  height: 100%;
  overflow-y: auto;
  padding: var(--p-3);
  background-color: var(--bg-base-color);
  border-radius: var(--br-2);
  box-shadow: 0px 1px 2px 0px rgba(19, 51, 107, 0.10),
    0px 0px 1px 0px rgba(19, 51, 107, 0.15);
}
</style>
