<script setup>
import { ElConfigProvider } from 'element-plus';
import zhCn from 'element-plus/es/locale/lang/zh-cn';
import { onMounted } from 'vue';
import localStorage from '@/utils/localStorage';


onMounted(() => {
  // 初始化主题
  const theme = localStorage.get('theme');

  if (theme) {
    for (const key in theme) {
      document.documentElement.style.setProperty(key, theme[key]);
    }
  }
});
</script>

<template>
  <ElConfigProvider :locale="zhCn">
    <router-view />
  </ElConfigProvider>
</template>

<style scoped></style>

<style src="./styles/base.css"></style>
<style src="./styles/global.css"></style>
<style src="./styles/theme.css"></style>
<style></style>
