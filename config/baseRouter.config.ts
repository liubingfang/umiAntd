export const UserRouter = [
  {
    path: '/user',
    component: '../layouts/UserLayout',
    type: 'base',
    routes: [
      { path: '/user', redirect: '/user/login' },
      {
        name: 'login',
        path: '/user/login',
        menuType: 2,
        component: './user/login',
      },
    ],
  },
];

export const AppRouter = [
  {
    name: '异常页',
    icon: 'warning',
    path: '/exception',
    hideInMenu: true,
    type: 'base',
    routes: [
      // exception
      {
        path: '/exception/403',
        name: '403',
        component: './Sys/Exception/403',
        menuType: 2,
      },
      {
        path: '/exception/404',
        name: '404',
        component: './Sys/Exception/404',
        menuType: 2,
      },
      {
        path: '/exception/500',
        name: '500',
        component: './Sys/Exception/500',
        menuType: 2,
      },
    ],
  },
  {
    component: './Sys/Exception/404',
    type: 'base',
  },
];
