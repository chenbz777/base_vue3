<script setup>
import { useRouter, useRoute } from 'vue-router';
import utils from '@/utils';
import { useMenu } from '@/stores';
import useRouterPlus from '@/hooks/useRouterPlus';

const router = useRouter();
const route = useRoute();

const { getRoutesData } = useRouterPlus();

const store = useMenu();

const userInfo = utils.localStorage.get('user') || { username: '默认昵称' };

const { routesMap } = getRoutesData();

const routeData = routesMap.get(route.name);

const logout = () => {
  utils.localStorage.delAll();

  router.push('/login');
};

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
      <el-icon @click="store.toggleCollapse" :size="20" class="main__head__left__icon">
        <Fold v-if="store.isOpen" />
        <Expand v-else />
      </el-icon>

      <el-breadcrumb>
        <el-breadcrumb-item v-for="item  in  routeData.parentList" :key="item.name" :to="{ name: item.name }">
          {{ item.meta.title }}
        </el-breadcrumb-item>
        <el-breadcrumb-item>
          {{ routeData.meta.title }}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="main__head__right">
      <el-popover placement="bottom" :width="200" trigger="click">
        <template #reference>
          <el-icon class="main__head__right__icon">
            <Bell />
          </el-icon>
        </template>

        <div>
          <div class="text-center">暂无消息</div>
        </div>
      </el-popover>

      <el-icon @click="toggleFullScreen()" class="main__head__right__icon">
        <FullScreen />
      </el-icon>

      <el-popover placement="bottom" :width="200" trigger="click">
        <template #reference>
          <el-button text class="c-row-center-y">
            {{ userInfo.username }}
            <el-icon class="ml-1">
              <ArrowDownBold />
            </el-icon>
          </el-button>
        </template>

        <div>
          <el-button text class="w-100" @click="logout()">
            退出登录
          </el-button>
        </div>
      </el-popover>
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