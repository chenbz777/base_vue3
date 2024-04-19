<script setup>
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import useRouterPlus from '@/hooks/useRouterPlus';
import { ArrowUpBold } from '@element-plus/icons-vue';


const router = useRouter();
const route = useRoute();

const { keepAliveList } = useRouterPlus();

const show = ref(false);

function open() {
  show.value = true;

  setTimeout(() => {
    const routeTabs = document.getElementById('routeTabs');

    routeTabs.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, 200);
}

function close() {
  show.value = false;
}

const handleTabChange = (fullPath) => {
  show.value = false;

  router.push(fullPath);
};

defineExpose({
  open
});
</script>

<template>
  <div class="route-tabs" v-show="show" @click="close()" id="routeTabs">
    <el-row :gutter="20" justify="center">
      <el-col :span="18" v-for="(item, index) in [...keepAliveList].reverse()" :key="item.name">
        <div class="route-tabs__card" :class="{ 'route-tabs__card--active': item.fullPath === route.fullPath }"
          @click.stop="handleTabChange(item.fullPath)">
          <div class="route-tabs__card__title">
            {{ item.meta?.title || item.name }}
          </div>
          <img :src="item.thumbnail" alt="" class="route-tabs__card__image" :key="item.thumbnail" />
        </div>

        <div class="text-center" v-if="(index + 1) !== keepAliveList.length">
          <el-icon class="route-tabs__icon">
            <ArrowUpBold />
          </el-icon>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped>
.route-tabs {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2001;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  padding: 100px 30px;
  overflow-y: auto;
}

.route-tabs__card {
  border: 5px solid #909399;
  border-radius: 20px;
  overflow: hidden;
}

.route-tabs__card--active {
  border-color: #409EFF;
}

.route-tabs__card__title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 18px;
  font-weight: 500;
  font-size: 16px;
  background-color: #eaeaea;
  color: #303133;
  border-bottom: 1px solid #e2e2e2;
}

.route-tabs__card__image {
  display: block;
  width: 100%;
}

.route-tabs__icon {
  font-size: 30px;
  margin: 10px 0;
  color: white;
}
</style>