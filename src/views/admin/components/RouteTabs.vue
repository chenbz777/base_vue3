<script setup>
import { watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import useRouterPlus from '@/hooks/useRouterPlus';
import { ElNotification } from 'element-plus';


const route = useRoute();
const router = useRouter();

const { keepAliveList, componentMap } = useRouterPlus();

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
}, { immediate: true });

const handleTabChange = (fullPath) => {
  router.push(fullPath);
};

const handleTabRemove = (fullPath) => {

  const index = keepAliveList.findIndex(item => item.fullPath === fullPath);

  if (fullPath === route.fullPath) {
    if (keepAliveList.length === 1) {
      ElNotification({
        title: '提示',
        message: '当前仅剩一个标签页, 不可关闭!',
        type: 'warning'
      });

      return false;
    } else if (index === 0) {
      router.push(keepAliveList[index + 1].fullPath);
    } else {
      router.push(keepAliveList[index - 1].fullPath);
    }
  }

  keepAliveList.splice(index, 1);
  componentMap.delete(fullPath);
};

// 刷新当前页
const refreshCurrentTab = () => {

  const data = keepAliveList.find(item => item.fullPath === route.fullPath);

  data.meta.keepAlive = false;

  router.afterEach(() => {
    data.meta.keepAlive = true;
  });

  router.push('/admin/blank');
};

// 关闭当前标签
const closeCurrentTab = () => {
  handleTabRemove(route.fullPath);
};

// 关闭其它标签
const closeOtherTabs = () => {

  for (let i = keepAliveList.length - 1; i >= 0; i--) {
    if (keepAliveList[i].fullPath !== route.fullPath) {
      keepAliveList.splice(i, 1);
    }
  }
};
</script>

<template>
  <div class="route-tabs">
    <el-tabs :model-value="route.fullPath" type="card" editable @tab-change="handleTabChange"
      @tab-remove="handleTabRemove" class="route-tabs__left">
      <el-tab-pane v-for="item in keepAliveList.filter(item => item.fullPath.includes('admin'))" :key="item.name"
        :name="item.fullPath">
        <template #label>
          <div class="rt-el-tabs__item--tips"></div>
          <div class="rt-el-tabs__item">{{ item.meta.title }}</div>
        </template>
      </el-tab-pane>
    </el-tabs>

    <div class="route-tabs__right">
      <el-dropdown>
        <el-button type="" text>
          更多
          <el-icon class="el-icon--right">
            <ArrowDownBold />
          </el-icon>
        </el-button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="refreshCurrentTab()">刷新当前页</el-dropdown-item>
            <el-dropdown-item @click="closeCurrentTab()">关闭当前标签</el-dropdown-item>
            <el-dropdown-item @click="closeOtherTabs()">关闭其它标签</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<style scoped>
.route-tabs {
  border-top: 1px solid var(--theme-divider-color);
  border-bottom: 1px solid var(--theme-divider-color);
  padding-bottom: 0;
  display: flex;
  align-items: center;
}

.route-tabs__left {
  flex: 1;
  width: 0;
}

.route-tabs__right {
  padding: 0 10px;
}

:deep(.el-tabs--card>.el-tabs__header) {
  border: 0;
  margin: 0;
}

:deep(.el-tabs--card>.el-tabs__header .el-tabs__nav) {
  border-top: 0;
  border-bottom: 0;
  border-left: 1px solid #ebeef5;
  border-right: 1px solid #ebeef5;
  border-radius: 0;
}

:deep(.el-tabs__item:hover) {
  color: var(--menu-active-color);
}

:deep(.el-tabs__item.is-active) {
  color: var(--menu-active-color);
  background-color: #f4f8fe;
}

:deep(.el-tabs__new-tab) {
  display: none;
}

.rt-el-tabs__item {
  max-width: 160px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

.rt-el-tabs__item--tips {
  width: 10px;
  height: 10px;
  border-radius: 100%;
  background-color: #d8d8d8;
  margin-right: 7px;
}

:deep(.el-tabs__item.is-active .rt-el-tabs__item--tips) {
  background-color: var(--menu-active-color);
}

:deep(.el-tabs--card>.el-tabs__header .el-tabs__item) {
  border: 0;
}
</style>