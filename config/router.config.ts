import { AppRouter, UserRouter } from './baseRouter.config';
import BusinessRouter from './businessRouter.config';

export default [
  // user
  ...UserRouter,
  {
    path: '/',
    component: '../layouts/SecurityLayout',
    type: 'base',
    routes: [
      {
        path: '/',
        component: '../layouts/BasicLayout',
        type: 'base',
        routes: [
          ...BusinessRouter,
          ...AppRouter,

          {
            type: 'base',
            component: './404',
          },
        ],
      },
      {
        type: 'base',
        component: './404',
      },
    ],
  },
  {
    type: 'base',
    component: './404',
  },
];
