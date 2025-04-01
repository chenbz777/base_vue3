<script setup>
import { ref, watch } from 'vue';
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

const mySrc = ref('');

function initUrl() {
  if (!props.src) {
    return;
  }

  if (props.src.includes('http')) {
    mySrc.value = props.src;
  } else {
    mySrc.value = `${config.request.baseURL}${props.src}`;
  }
}

watch(() => props.src, (value) => {
  initUrl();
}, { immediate: true });

function handleImageError(event) {
  const { target } = event;

  if (target.src === '/imageError.png') {
    return;
  }

  target.setAttribute('data-source', target.src);

  target.src = '/imageError.png';
}
</script>

<template>
  <img :src="mySrc" class="image-enhance" :style="{ aspectRatio, objectFit: mode }" @error="handleImageError" />
</template>

<style scoped>
.image-enhance {
  display: block;
  width: 100%;
  height: auto;
}
</style>