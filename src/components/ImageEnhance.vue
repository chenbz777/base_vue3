<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
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
    default: 'contain'
  },
  errorText: {
    type: String,
    default: '图片加载失败'
  }
});

const emit = defineEmits(['load', 'error']);

/**
 * 图片增强
 * 
 * 加载顺序: 加载中占位图 => 缩略图 => 原图
 * 
 * 注意事项:
 *   - 根据业务完善缩略图的生成方式
 *   - 根据业务完善原图的生成方式
 */

const imageEnhanceRef = ref(null);

const currentSrc = ref('');

const text = ref('图片加载中...');

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

function handleImageError() {
  currentSrc.value = '';
  text.value = props.errorText;

  emit('error');
}

function loadOriginal() {
  const url = getOriginalUrl();

  const image = new Image();

  image.src = url;

  image.onload = () => {
    currentSrc.value = url;
  };

  image.onerror = () => {
    handleImageError();
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
    handleImageError();
  };
}

function lazyImage(elm) {
  io = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      // 加载缩略图
      loadThumbnail();

      io.disconnect();
    }
  });

  io.observe(elm);
}

function loadLoading() {
  const target = imageEnhanceRef.value;

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
}

onMounted(() => {
  loadLoading();
});

onBeforeUnmount(() => {
  if (io) {
    io.disconnect();
    io = null;
  }
});

function onLoad(event) {
  emit('load', event);
}
</script>

<template>
  <div class="image-enhance" ref="imageEnhanceRef">
    <img :src="currentSrc" class="image-enhance__image" :style="{
      aspectRatio: props.aspectRatio,
      objectFit: props.mode
    }" @load="onLoad" v-if="currentSrc" />

    <div class="image-enhance__text" v-else>
      {{ text }}
    </div>
  </div>
</template>

<style scoped>
.image-enhance {
  width: 100%;
  background-color: #f3f6f9;
}

.image-enhance__image {
  display: block;
  width: 100%;
  height: 100%;
}

.image-enhance__text {
  width: 100%;
  aspect-ratio: 16 / 9;
  color: #a8abb2;
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>