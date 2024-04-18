<script setup>
import { nextTick } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import useRouterPlus from '@/hooks/useRouterPlus';
import { Menu, HomeFilled, ArrowLeftBold } from '@element-plus/icons-vue';


const route = useRoute();
const router = useRouter();

const { keepAliveList, formatComponentInstance } = useRouterPlus();

nextTick(() => {

  const mobile = document.getElementById('mobile');

  mobile.style.height = `${window.innerHeight}px`;

  const mobileBody = document.getElementById('mobileBody');

  const mobileBodyHeight = mobileBody.offsetHeight;

  document.documentElement.style.setProperty('--mobile-body-height', `${mobileBodyHeight}px`);
});

// 点击菜单按钮
function handleMenuClick() {
  console.log('menu');
}

// 点击首页按钮
function handleHomeClick() {
  router.push('/');
}

// 点击返回按钮
function handleBackClick() {
  router.back();
}
</script>

<template>
  <div class="mobile" id="mobile">
    <div class="mobile__head" id="mobileHead">
      {{ route.meta?.title || route.name }}
    </div>

    <div class="mobile__body" id="mobileBody">
      <router-view v-slot="{ Component }">
        <AnimateTransition>
          <keep-alive :include="keepAliveList.filter(item => item.meta.keepAlive).map(item => item.fullPath)">
            <component :is="formatComponentInstance(Component, route)" :key="route.fullPath" />
          </keep-alive>
        </AnimateTransition>
      </router-view>
    </div>

    <div class="mobile__foot" id="mobileFoot" @click="handleMenuClick()">
      <div class="mobile__foot__menu">
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
    </div>
  </div>
</template>

<style scoped>
.mobile {
  background-color: white;
  color: #303133;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.mobile__head {
  padding: 10px;
  text-align: center;
  font-weight: 600;
  font-size: 16px;
  background-color: #eaeaea;
  border-bottom: 1px solid #e2e2e2;
}

.mobile__body {
  flex: 1;
  overflow: auto;
}

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