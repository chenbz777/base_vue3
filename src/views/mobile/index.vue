<script setup>
import { useRoute } from 'vue-router';
import useRouterPlus from '@/hooks/useRouterPlus';
import MobileEasyHead from './components/MobileEasyHead.vue';
import useRouteData from '@/hooks/useRouteData';


const route = useRoute();

const { mobileKeepAliveList, formatComponentInstance } = useRouterPlus();

const { navigationType } = useRouteData();
</script>

<template>
  <BaseContainer class="mobile">
    <template #head>
      <MobileEasyHead id="mobileHead" />
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

<style scoped>
.mobile {
  height: 100vh;
}
</style>