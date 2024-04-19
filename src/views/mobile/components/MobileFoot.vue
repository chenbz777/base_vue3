<script setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { HomeFilled, ArrowLeftBold, Refresh, ArrowRightBold } from '@element-plus/icons-vue';
import RouteTabs from './RouteTabs.vue';
import useRouterPlus from '@/hooks/useRouterPlus';

const router = useRouter();
const route = useRoute();
const routeTabsRef = ref();

const { keepAliveList } = useRouterPlus();

// 点击菜单按钮
async function handleMenuClick() {
  routeTabsRef.value.open();
}

// 点击首页按钮
function handleHomeClick() {
  router.push('/mobile/home');
}

// 点击返回按钮
function handleBackClick() {
  router.back();
}

// 点击刷新按钮
function handleRefreshClick() {
  const data = keepAliveList.find(item => item.fullPath === route.fullPath);

  data.meta.keepAlive = false;

  router.afterEach(() => {
    data.meta.keepAlive = true;
  });

  router.push('/mobile/blank');
}

// 点击前进按钮
function handleForwardClick() {
  router.forward();
}
</script>

<template>
  <div class="mobile__foot">
    <div class="mobile__foot__menu" @click="handleMenuClick()">
      <div class="mobile__foot__menu__win">
        {{ keepAliveList.length }}
      </div>
    </div>
    <!-- 刷新功能已经写好, 根据需求再开启 -->
    <div class="mobile__foot__menu" @click="handleRefreshClick()" style="display: none;">
      <el-icon class="mobile__foot__icon">
        <Refresh />
      </el-icon>
    </div>
    <div class="mobile__foot__menu" @click="handleHomeClick()">
      <el-icon class="mobile__foot__icon">
        <HomeFilled />
      </el-icon>
    </div>
    <div class="mobile__foot__menu" @click="handleBackClick()">
      <el-icon class="mobile__foot__icon">
        <ArrowLeftBold />
      </el-icon>
    </div>
    <!-- 前进功能已经写好, 根据需求再开启 -->
    <div class="mobile__foot__menu" @click="handleForwardClick()" style="display: none;">
      <el-icon class="mobile__foot__icon">
        <ArrowRightBold />
      </el-icon>
    </div>

    <RouteTabs ref="routeTabsRef" />
  </div>
</template>

<style scoped>
.mobile__foot {
  display: flex;
  justify-content: space-around;
  /* background-color: #000000;
  color: white; */
  background-color: #eaeaea;
  border-top: 1px solid #e2e2e2;
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
}

.mobile__foot__menu {
  padding: 10px;
}

.mobile__foot__icon {
  display: block;
  font-size: 26px;
}

.mobile__foot__menu__win {
  border: 2px solid #2a2b2d;
  color: #2a2b2d;
  border-radius: 4px;
  font-weight: 500;
  width: 26px;
  height: 26px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>