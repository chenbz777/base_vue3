<script setup>
import AdminAside from './components/AdminAside.vue';
import MainHead from './components/MainHead.vue';
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

      <div class="admin__main__content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<style scoped>
.admin {
  display: flex;
  background-color: var(--theme-page-color);
}

.admin__aside {
  position: relative;
  height: 100vh;
  padding: 10px 6px;
  overflow-x: hidden;
  overflow-y: auto;
  background-color: var(--menu-bg-color);
}

.admin__main {
  flex: 1;
  width: 0;
}

.admin__main__head {
  background-color: var(--theme-page-color);
}

.admin__main__content {
  border-top: 1px solid var(--theme-divider-color);
  padding: 20px;
  height: calc(100vh - 60px);
  overflow: auto;
}
</style>
