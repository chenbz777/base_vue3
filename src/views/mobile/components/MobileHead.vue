<script setup>
import { ref } from 'vue';
import { ArrowLeftBold } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';
import RouteTabs from './RouteTabs.vue';
import useRouterPlus from '@/hooks/useRouterPlus';


const title = ref(document.title);

// 需要观察的节点
const targetNode = document.querySelector('title');

// 配置器的配置：需要监听的变动
const config = { characterData: true, subtree: true, childList: true };

// 变动时回调
const callback = function (mutations) {
  title.value = mutations[0].target.innerText;
};

// 创建一个MutationObserver实例
const observer = new MutationObserver(callback);

// 监听目标节点
observer.observe(targetNode, config);

const router = useRouter();

// 点击返回按钮
function handleBackClick() {
  router.back();
}

const routeTabsRef = ref();

const { keepAliveList } = useRouterPlus();

// 点击菜单按钮
async function handleMenuClick() {
  routeTabsRef.value.open();
}
</script>

<template>
  <div class="mobile__head">
    <div class="mobile__head__tool" @click="handleBackClick()">
      <el-icon class="mobile__head__icon">
        <ArrowLeftBold />
      </el-icon>
    </div>
    <div class="mobile__head__content"> {{ title }}</div>
    <div class="mobile__head__tool" @click="handleMenuClick()">
      <div class="mobile__head__win">
        {{ keepAliveList.length }}
      </div>
    </div>

    <RouteTabs ref="routeTabsRef" />
  </div>
</template>

<style scoped>
.mobile__head {
  padding: 10px;
  text-align: center;
  font-weight: 600;
  font-size: 18px;
  background-color: #eaeaea;
  border-bottom: 1px solid #e2e2e2;
  display: flex;
  align-items: center;
}

.mobile__head__content {
  flex: 1;
  width: 0;
  text-align: center;
}

.mobile__head__tool {
  width: 46px;
  padding: 0 10px;
}

.mobile__head__icon {
  display: block;
  font-size: 26px;
}

.mobile__head__win {
  border: 2px solid #2a2b2d;
  color: #2a2b2d;
  border-radius: 4px;
  font-weight: 500;
  width: 26px;
  height: 26px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>