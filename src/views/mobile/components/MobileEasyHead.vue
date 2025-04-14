<script setup>
import { ref, watch } from 'vue';
import MobileBaseHead from './MobileBaseHead.vue';
import { ArrowLeftBold } from '@element-plus/icons-vue';
import { useRoute } from 'vue-router';
import router from '@/router';


defineProps({
  clickBackFn: {
    type: Function,
    default: null
  }
});

function defaultClickBack() {
  router.back();
}

const route = useRoute();

// 移动端路由列表
const mobileRouteList = router.options.routes.find(item => item.name === 'mobile').children;

// 移动端路由列表第一个路由
const mobileRouteListFirst = mobileRouteList[0];

const showMobileHead = ref(true);

const showBackButton = ref(false);

watch(() => route.fullPath, () => {
  if (!route.meta) {
    return;
  }

  // 如果路由的 meta 中没有 navigationStyle，或者 navigationStyle 不是 'custom'，则显示头部
  showMobileHead.value = route.meta.navigationStyle !== 'custom';

  // 如果不是第一个路由，显示【返回】按钮
  showBackButton.value = route.name !== mobileRouteListFirst.name;
}, { immediate: true });
</script>

<template>
  <MobileBaseHead class="mobile-easy-head" v-if="showMobileHead">
    <template #left v-if="showBackButton">
      <div class="mobile-easy-head__left" @click="clickBackFn ? clickBackFn() : defaultClickBack()">
        <el-icon class="mobile__head__icon">
          <ArrowLeftBold />
        </el-icon>
        返回
      </div>
    </template>

    <div class="mobile-easy-head__title">{{ route.meta?.title }}</div>

    <template #right>
      <slot name="right"></slot>
    </template>
  </MobileBaseHead>
</template>

<style scoped>
.mobile-easy-head {
  background-color: white;
  color: black;
}

.mobile-easy-head__left {
  display: flex;
  align-items: center;
}

.mobile-easy-head__title {
  font-weight: 600;
}
</style>