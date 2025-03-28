<script setup>
import { useRouter, useRoute } from 'vue-router';
import utils from '@/utils';
import useRouterPlus from '@/hooks/useRouterPlus';
import useMenu from '@/hooks/useMenu';
import useUserInfo from '@/hooks/useUserInfo';
import { ArrowDownBold, Expand, Fold, FullScreen } from '@element-plus/icons-vue';


const router = useRouter();
const route = useRoute();

const { getRoutesData } = useRouterPlus();

const { toggleCollapse, isOpen } = useMenu();

const { userInfo } = useUserInfo();

const { routesMap } = getRoutesData();

const logout = () => {
  utils.localStorage.delAll();

  router.push('/admin/login');
};

// 切换全屏
const toggleFullScreen = () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
};
</script>

<template>
  <div class="main__head">
    <div class="main__head__left">
      <el-icon @click="toggleCollapse" :size="20" class="main__head__left__icon">
        <Fold v-if="isOpen" />
        <Expand v-else />
      </el-icon>

      <el-breadcrumb>
        <el-breadcrumb-item v-for="item in routesMap.get(route.name).parentList" :key="item.name"
          :to="{ name: item.name }">
          {{ item.meta.title }}
        </el-breadcrumb-item>
        <el-breadcrumb-item>
          {{ routesMap.get(route.name).meta.title }}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="main__head__right">

      <el-icon @click="toggleFullScreen()" class="main__head__right__icon">
        <FullScreen />
      </el-icon>

      <el-dropdown>
        <el-button type="" text>
          {{ userInfo.username }}
          <el-icon class="ml-1">
            <ArrowDownBold />
          </el-icon>
        </el-button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="logout()">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<style scoped>
.main__head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  padding: 0 20px;
}

.main__head__left {
  flex: 1;
  display: flex;
  align-items: center;
}

.main__head__left__icon {
  cursor: pointer;
  margin-right: 10px;
}

.main__head__right {
  display: flex;
  align-items: center;
}

.main__head__right__icon {
  cursor: pointer;
  font-size: 22px;
  margin: 0 12px;
}
</style>