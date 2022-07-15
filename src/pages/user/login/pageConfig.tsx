import { UserOutlined, LockOutlined } from '@ant-design/icons';
import React from 'react';

import type { RenderFormItemType } from '@/pages/index';

const formItemProps = {};

interface PageConfigTypes {
  name: string;
  path: string;
  accountFormItems: RenderFormItemType[];
  phoneFormItems: RenderFormItemType[];
}

interface pageConfigProps {
  mobilesOptions: { key: string; value: string }[] | [];
}

export default ({ mobilesOptions }: pageConfigProps): PageConfigTypes => {
  return {
    name: '登录',
    path: '/user/login',
    accountFormItems: [
      {
        widget: 'AInput',
        name: 'username',
        label: null,
        rules: [
          {
            required: true,
            message: `请输入用户名`,
          },
        ],
        formItemProps,
        widgetProps: {
          placeholder: `请输入用户名`,
          size: 'large',
          prefix: <UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />,
        },
      },
      {
        widget: 'AInputPassword',
        name: 'password',
        label: null,
        rules: [
          {
            required: true,
            message: `请输入密码`,
          },
        ],
        formItemProps,
        widgetProps: {
          placeholder: `请输入密码`,
          prefix: <LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />,
          size: 'large',
        },
      },
    ],
    phoneFormItems: [
      {
        widget: 'ASelect',
        name: 'mobile',
        rules: [
          {
            required: true,
            message: '请选择手机号码',
          },
        ],
        formItemProps: {
          ...formItemProps,
        },
        widgetProps: {
          options: mobilesOptions,
          placeholder: `请选择手机号码`,
          size: 'large',
          style: {
            width: '100%',
          },
        },
      },
    ],
  };
};
