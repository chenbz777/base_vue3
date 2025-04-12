import { onMounted, onBeforeUnmount, getCurrentInstance } from 'vue';


export default function useLazyMounted(callback, options) {
  // 获取当前实例
  const instance = getCurrentInstance();

  if (!instance || !instance.proxy) {
    return;
  }

  let io = null;

  onMounted(() => {
    const el = instance.proxy.$el;

    if (!el) {
      return;
    }

    io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        callback();
        io.disconnect();
      }
    }, {
      rootMargin: '100px',
      ...options
    });

    io.observe(el);
  });

  onBeforeUnmount(() => {
    if (io) {
      io.disconnect();
      io = null;
    }
  });
}