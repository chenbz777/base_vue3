<script setup>
import { useRouter, useRoute } from 'vue-router';
import utils from '@/utils';
import { useMenu } from '@/stores';

const router = useRouter();
const route = useRoute();

const store = useMenu();

const userInfo = utils.localStorage.get('user') || { username: '默认昵称' };

const logout = () => {
  utils.localStorage.delAll();

  router.push('/login');
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
        <el-breadcrumb-item v-for=" item  in  route.meta.title " :key="item">{{ item }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="main__head__right">
      <el-popover placement="bottom" :width="200" trigger="hover">
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
</style>