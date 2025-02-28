import { ref } from 'vue';


const isOpen = ref(true);

const showTitle = ref(true);

const title = ref('后台管理系统');

const menuList = ref([
  {
    name: '仪表盘',
    path: '/admin/home',
    icon: 'Files'
  },
  {
    name: '仪表盘2',
    path: '/admin/home2/2',
    icon: 'Files'
  },
  {
    name: '仪表盘3',
    path: '/admin/home2/3',
    icon: 'Files'
  }
  // {
  //   name: '组织架构',
  //   path: '/admin/organizational',
  //   icon: 'User',
  //   children: [
  //     {
  //       name: '人员管理',
  //       path: '/admin/organizational/personnelManage'
  //     },
  //     {
  //       name: '部门管理',
  //       path: '/admin/organizational/departmentManage'
  //     },
  //     {
  //       name: '角色权限',
  //       path: '/admin/organizational/roleManage'
  //     }
  //   ]
  // }
]);

function toggleCollapse() {
  if (isOpen.value) {
    showTitle.value = false;
  } else {
    // 延迟 0.3s 显示标题
    setTimeout(() => {
      showTitle.value = true;
    }, 300);
  }

  isOpen.value = !isOpen.value;
}


export default function useMenu() {
  return {
    isOpen,
    showTitle,
    title,
    menuList,
    toggleCollapse
  };
}