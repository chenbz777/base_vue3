import { ref } from 'vue';
import localStorage from '@/utils/localStorage';


const userInfo = ref(localStorage.get('userInfo') || {
  username: '未命名用户'
});


export default function useUserInfo() {
  return {
    userInfo
  };
}