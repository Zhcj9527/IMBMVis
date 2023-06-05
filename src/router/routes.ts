import type { RouteRecordRaw } from 'vue-router'
// 配置常量路由
export const constantRoutes: Array<RouteRecordRaw> = [
  {
    // 登陆
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      title: '登录', //菜单标题,
      isHidden: true, // 是否隐藏
      icon: 'Promotion', // 前缀图标
    },
  },
  {
    // 登陆成功以后展示数据的路由
    path: '/',
    name: 'layout',
    redirect: '/home',
    component: () => import('@/layout/index.vue'),
    meta: {
      title: '',
      isHidden: false, // 是否隐藏
      icon: '', // 前缀图标
    },
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () => import('@/views/home/index.vue'),
        meta: {
          title: '首页',
          isHidden: false, // 是否隐藏
          icon: 'HomeFilled', // 前缀图标
        },
      },
    ],
  },
  {
    path: '/screen',
    name: 'Screen',
    component: () => import('@/views/screen/index.vue'),
    meta: {
      title: '数据可视化',
      isHidden: false, // 是否隐藏
      icon: 'Monitor', // 前缀图标
    },
  },
  {
    // 404
    path: '/404',
    name: '404',
    component: () => import('@/views/404/index.vue'),
    meta: {
      title: '404',
      isHidden: true, // 是否隐藏
      icon: 'Check', // 前缀图标
    },
  },
]


// 异步路由
export const asyncRoute = [
  {
    path: '/acl',
    name: 'Acl',
    component: () => import('@/layout/index.vue'),
    meta: {
      title: '权限管理',
      isHidden: false, // 是否隐藏
      icon: 'Rank', // 前缀图标
    },
    redirect: '/acl/user',
    children: [
      {
        path: '/acl/user',
        name: 'User',
        component: () => import('@/views/acl/user/index.vue'),
        meta: {
          title: '用户管理',
          isHidden: false,
          icon: 'User',
        },
      },
      {
        path: '/acl/role',
        name: 'Role',
        component: () => import('@/views/acl/role/index.vue'),
        meta: {
          title: '角色管理',
          isHidden: false,
          icon: 'ForkSpoon',
        },
      },
      {
        path: '/acl/permission',
        name: 'Permission',
        component: () => import('@/views/acl/permission/index.vue'),
        meta: {
          title: '菜单管理',
          isHidden: false,
          icon: 'HelpFilled',
        },
      },
    ],
  },
  {
    path: '/product',
    name: 'Product',
    component: () => import('@/layout/index.vue'),
    meta: {
      title: '商品管理',
      isHidden: false, // 是否隐藏
      icon: 'CreditCard', // 前缀图标
    },
    redirect: '/product/trademark',
    children: [
      {
        path: '/product/trademark',
        name: 'Trademark',
        component: () => import('@/views/product/trademark/index.vue'),
        meta: {
          title: '品牌管理',
          isHidden: false, // 是否隐藏
          icon: 'Present', // 前缀图标
        },
      },
      {
        path: '/product/attr',
        name: 'Attr',
        component: () => import('@/views/product/attr/index.vue'),
        meta: {
          title: '属性管理',
          isHidden: false, // 是否隐藏
          icon: 'Soccer', // 前缀图标
        },
      },
      {
        path: '/product/spu',
        name: 'Spu',
        component: () => import('@/views/product/spu/index.vue'),
        meta: {
          title: 'SPU管理',
          isHidden: false, // 是否隐藏
          icon: 'Calendar', // 前缀图标
        },
      },
      {
        path: '/product/sku',
        name: 'Sku',
        component: () => import('@/views/product/sku/index.vue'),
        meta: {
          title: 'SKU管理',
          isHidden: false, // 是否隐藏
          icon: 'Suitcase', // 前缀图标
        },
      },
    ],
  },
]

// 任意路由
export const anyRoute = [
  {
    // 任意路由，没找到以上页面，重定向到404
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    name: 'Any',
    meta: {
      title: '任意路由',
      isHidden: true, // 是否隐藏
      icon: 'Switch', // 前缀图标
    },
  },
]