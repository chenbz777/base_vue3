<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { Menu, HomeFilled, ArrowLeftBold } from '@element-plus/icons-vue';
import RouteTabs from './RouteTabs.vue';

const router = useRouter();

const routeTabsRef = ref();

// 点击菜单按钮
function handleMenuClick() {
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
</script>

<template>
  <div class="mobile__foot">
    <div class="mobile__foot__menu" @click="handleMenuClick()">
      <el-icon class="mobile__foot__icon">
        <Menu />
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
</style>