<script setup>
import { ref, nextTick } from 'vue';
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

function lazyImage(elm) {
  // [阮一峰 IntersectionObserver API 使用教程](https://www.ruanyifeng.com/blog/2016/11/intersectionobserver_api.html)
  const io = new IntersectionObserver((entires) => {
    entires.forEach(item => {
      if (item.isIntersecting) {
        // 该元素进入视口，开始加载图片
        const target = item.target;

        // 获取真实的图片缩略图地址
        const thumbnailSrc = target.getAttribute('data-thumbnail');

        // 将图片地址赋值给src属性。
        target.setAttribute('src', thumbnailSrc);

        // 将该元素停止监听
        io.unobserve(target);

        // 开始加载原图
        const image = new Image();

        image.src = target.getAttribute('data-src');

        image.onload = () => {
          // 图片加载完成后，设置src属性
          target.setAttribute('src', image.src);
        };

        image.onerror = () => {
          // 图片加载失败后，设置src属性
          target.setAttribute('src', '/imageError.png');
        };
      }
    });
  });

  io.observe(elm);
}


function getFullUrl() {
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

nextTick(() => {
  const target = imageRef.value;

  /**
   * 设置图片的属性
   */

  // 设置图片缩略图
  target.setAttribute('data-thumbnail', getThumbnailUrl());

  // 设置图片原图
  target.setAttribute('data-src', getFullUrl());

  lazyImage(target);
});

function handleImageError(event) {
  const { target } = event;

  // 更换图片地址为: 图片加载失败占位图
  target.src = '/imageError.png';
}
</script>

<template>
  <img :src="currentSrc" class="image-enhance" :style="{ aspectRatio, objectFit: mode }" ref="imageRef"
    @error="handleImageError" />
</template>

<style scoped>
.image-enhance {
  display: block;
  width: 100%;
  height: auto;
}
</style>