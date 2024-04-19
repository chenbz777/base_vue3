<script setup>
import { watch, nextTick } from 'vue';
import { useRoute } from 'vue-router';
import useRouterPlus from '@/hooks/useRouterPlus';
// import MobileHead from './components/MobileHead.vue';
import MobileFoot from './components/MobileFoot.vue';

/**
 * 前言: 本页面是移动端的主页面, 用于展示移动端的内容
 * MobileHead 和 MobileFoot 功能上基本一致, 所以这里只展示一个, 后续可根据需求自行决定使用哪个, 建议使用 MobileFoot
 */


const route = useRoute();

const { keepAliveList, formatComponentInstance } = useRouterPlus();

watch(() => route.fullPath, () => {
  const routeData = {};

  const routeMeta = Object.assign({
    title: '默认标题',
    keepAlive: false,
    collect: true
  }, route.meta || {});

  routeData.fullPath = route.fullPath;
  routeData.path = route.path;
  routeData.name = route.name;
  routeData.meta = routeMeta;

  if (!keepAliveList.find(item => item.fullPath === routeData.fullPath) && routeMeta.collect) {
    keepAliveList.push(routeData);
  }


  // 这里是定制逻辑,切换回前面的页面, 就把后面的路由删了
  const index = keepAliveList.findIndex(item => item.fullPath === route.fullPath);
  if (index !== -1) {
    keepAliveList.length = index + 1;
  }
  // end

}, { immediate: true });

// 初始化移动端高度
function initMobileHeight() {
  const mobile = document.getElementById('mobile');

  mobile.style.height = `${window.innerHeight}px`;

  const mobileBody = document.getElementById('mobileBody');

  const mobileBodyHeight = mobileBody.offsetHeight;

  document.documentElement.style.setProperty('--mobile-body-height', `${mobileBodyHeight}px`);
}

nextTick(() => {
  initMobileHeight();
});

window.onresize = function () {
  initMobileHeight();
};
</script>

<template>
  <div class="mobile" id="mobile">
    <!-- <MobileHead id="mobileHead" /> -->

    <div class="mobile__body" id="mobileBody">
      <router-view v-slot="{ Component }">
        <AnimateTransition>
          <keep-alive :include="keepAliveList.filter(item => item.meta.keepAlive).map(item => item.fullPath)">
            <component :is="formatComponentInstance(Component, route)" :key="route.fullPath" />
          </keep-alive>
        </AnimateTransition>
      </router-view>
    </div>

    <MobileFoot id="mobileFoot" />
  </div>
</template>

<style scoped>
.mobile {
  background-color: var(--mobile-bg-color);
  color: #303133;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.mobile__body {
  flex: 1;
  overflow-x: hidden;
  overflow-y: auto;
  background-color: var(--mobile-bg-color);
}
</style>