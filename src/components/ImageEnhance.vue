<script setup>
import { ref, nextTick, onBeforeUnmount } from 'vue';
import config from '@/config';


const props = defineProps({
  src: {
    type: String,
    default: ''
  },
  aspectRatio: {
    type: String,
    default: ''
  },
  mode: {
    type: String,
    default: 'cover'
  }
});

/**
 * 图片增强
 * 
 * 加载顺序: 加载中占位图 => 缩略图 => 原图
 * 
 * 注意事项:
 *   - 根据业务完善缩略图的生成方式
 *   - 根据业务完善原图的生成方式
 */

const imageRef = ref(null);

const currentSrc = ref('/loading.gif');

let io = null;

function getOriginalUrl() {
  if (!props.src) {
    return '';
  }

  if (props.src.includes('http')) {
    return props.src;
  }

  if (props.src.includes('data:image')) {
    return props.src;
  }

  return `${config.request.baseURL}${props.src}`;
}


function getThumbnailUrl() {
  if (!props.src) {
    return '';
  }

  if (props.src.includes('http')) {
    return props.src;
  }

  if (props.src.includes('data:image')) {
    return props.src;
  }

  return `${config.request.baseURL}${props.src}`;
}

function loadOriginal() {
  const url = getOriginalUrl();

  const image = new Image();

  image.src = url;

  image.onload = () => {
    currentSrc.value = url;
  };

  image.onerror = () => {
    currentSrc.value = '/imageError.png';
  };
}


function loadThumbnail() {
  const url = getThumbnailUrl();

  const image = new Image();

  image.src = url;

  image.onload = () => {
    currentSrc.value = url;

    // 预加载原图
    loadOriginal();
  };

  image.onerror = () => {
    currentSrc.value = '/imageError.png';
  };
}

function lazyImage(elm) {
  // [阮一峰 IntersectionObserver API 使用教程](https://www.ruanyifeng.com/blog/2016/11/intersectionobserver_api.html)
  io = new IntersectionObserver((entires) => {
    entires.forEach(item => {
      // 该元素进入视口
      if (item.isIntersecting) {
        const target = item.target;

        // 加载缩略图
        loadThumbnail();

        // 将该元素停止监听
        io.unobserve(target);
      }
    });
  });

  io.observe(elm);
}

nextTick(() => {
  const target = imageRef.value;

  if (!target) {
    return;
  }

  /**
   * 设置图片的属性
   */

  // 设置图片缩略图
  target.setAttribute('data-thumbnail', getThumbnailUrl());

  // 设置图片原图
  target.setAttribute('data-original', getOriginalUrl());

  lazyImage(target);
});


onBeforeUnmount(() => {
  if (io) {
    io.disconnect();
    io = null;
  }
});
</script>

<template>
  <img :src="currentSrc" class="image-enhance" :style="{ aspectRatio, objectFit: mode }" ref="imageRef" />
</template>

<style scoped>
.image-enhance {
  display: block;
  width: 100%;
  height: auto;
}
</style>