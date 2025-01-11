<script setup>
import MobileBaseHead from './MobileBaseHead.vue';
import { ArrowLeftBold } from '@element-plus/icons-vue';
import { useRoute, useRouter } from 'vue-router';


const router = useRouter();
const route = useRoute();

defineProps({
  showBack: {
    type: Boolean,
    default: false
  },
  clickBackFn: {
    type: Function,
    default: null
  }
});

function defaultClickBack() {
  router.back();
}
</script>

<template>
  <MobileBaseHead class="mobile-easy-head">
    <template #left>
      <el-icon class="mobile__head__icon" @click="clickBackFn ? clickBackFn() : defaultClickBack()">
        <ArrowLeftBold />
      </el-icon>
    </template>

    <div>{{ route.meta?.title }}</div>

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
</style>