<script setup>
import { watch } from 'vue';
import { useRoute } from 'vue-router';
import useRouterEnhance from '@/hooks/useRouterEnhance';
import MobileEasyHead from './components/MobileEasyHead.vue';
import useRouteData from '@/hooks/useRouteData';


const route = useRoute();

const { mobileKeepAliveList, formatComponentInstance } = useRouterEnhance();

const { navigationType } = useRouteData();

watch(() => route.fullPath, () => {
  const routeMeta = Object.assign({
    title: '默认标题',
    keepAlive: false
  }, route.meta || {});

  const routeData = {
    fullPath: route.fullPath,
    path: route.path,
    name: route.name,
    meta: routeMeta
  };

  if (!mobileKeepAliveList.find(item => item.fullPath === routeData.fullPath)) {
    mobileKeepAliveList.push(routeData);
  }
}, { immediate: true });
</script>

<template>
  <BaseContainer height="100vh">
    <template #head>
      <MobileEasyHead />
    </template>

    <router-view v-slot="{ Component }">
      <AnimateTransition :type="navigationType">
        <keep-alive :include="mobileKeepAliveList.filter(item => item.meta.keepAlive).map(item => item.fullPath)">
          <component :is="formatComponentInstance(Component, route)" :key="route.fullPath" />
        </keep-alive>
      </AnimateTransition>
    </router-view>
  </BaseContainer>
</template>

<style scoped></style>