interface routerTypes {
  path?: string;
  component?: string;
  name?: string;
  icon?: string;
  menuType?: number;
  routes?: routerTypes[];
}

export default [
  {
    name: '测试菜单01--级别一',
    path: '/test01',
    icon: 'radarChart',
    menuType: 1,
    routes: [
      {
        name: '测试菜单01--级别二',
        path: '/test01/demo',
        menuType: 2,
        component: './Demo',
      },
    ],
  },
  {
    name: '测试菜单02--级别一',
    path: '/test02',
    icon: 'playCircle',
    menuType: 1,
    routes: [
      {
        name: '测试菜单02--级别二',
        path: '/test02/test',
        menuType: 2,
        component: './Test',
      },
    ],
  },
] as routerTypes[];
