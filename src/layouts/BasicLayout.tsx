import React, { useState, useEffect, useMemo } from 'react';
import { history, Link, connect } from 'umi';
import ProLayout, { DefaultFooter, PageContainer } from '@ant-design/pro-layout';
import logo from '@/assets/logo.svg';
import defaultSettings from 'config/defaultSettings';
import { IconMap } from '@/utils/constant';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import RightContent from '@/components/GlobalHeader/RightContent';

import type { MenuDataItem } from '@ant-design/pro-layout';
import type { Dispatch } from 'umi';
import type {
  BasicLayoutProps as ProLayoutProps,
  Settings,
  ProSettings,
} from '@ant-design/pro-layout';
import type { CurrentUser, MenuNav } from '@/models/user';
import type { ConnectState } from '@/models/connect';

const { title, isLocalMenus } = defaultSettings;

const getFlatMenus = (menuData: MenuNav[] = []): MenuNav[] => {
  let menus: MenuNav[] = [];
  menuData.forEach((item) => {
    if (!item) {
      return;
    }
    menus.push(item);
    const child = item?.children || item?.routes;
    if (child) {
      menus = menus.concat(getFlatMenus(child));
    }
  });

  return menus;
};

const formatter = (data: any[] = []) => {
  return data
    .map((item) => {
      if (!item.name || !item.path) {
        return null;
      }
      const result = { ...item };
      const child = item.routes;
      if (child) {
        const children = formatter(child);

        result.children = children;
      }
      delete result.routes;
      return result;
    })
    .filter((item) => item);
};

export interface BasicLayoutPropsType extends ProLayoutProps {
  dispatch: Dispatch;
  settings: Settings;
  currentUser: CurrentUser;
  route: ProLayoutProps['route'] & {};
}

const defaultFooterDom = (
  <DefaultFooter copyright={`${new Date().getFullYear()} ${title}`} links={[]} />
);

const BasicLayout: React.FC<BasicLayoutPropsType> = (props) => {
  const {
    dispatch,
    children,
    settings,
    currentUser: { menuNav = [] },
    route,
    location = {
      pathname: '/',
    },
  } = props;

  const [mySettings, setMySetting] = useState<Partial<ProSettings> | undefined>(settings);

  console.log('props :>> ', props);

  const flatMenus = useMemo(() => {
    return isLocalMenus ? getFlatMenus(formatter(route?.routes)) : getFlatMenus(menuNav);
  }, [menuNav]);

  const loopMenuItem = (menus: MenuDataItem[]): MenuDataItem[] => {
    return menus.map(({ icon, children: menuChildren, ...item }) => ({
      ...item,
      icon: icon && IconMap[icon as string],
      children: menuChildren && loopMenuItem(menuChildren),
    }));
  };

  const renderMenuData = isLocalMenus ? formatter(route?.routes) : loopMenuItem(menuNav);

  useEffect(() => {
    // 默认跳转至第一个 menuType=2 的路径
    const JumpDefaultPath = () => {
      for (const item of flatMenus) {
        const { menuType, path } = item;
        if (menuType === 2) {
          history.push(path);
          return;
        }
      }
    };

    if (location.pathname === '/') {
      JumpDefaultPath();
    }
  }, [location.pathname]);

  useEffect(() => {
    if (dispatch) {
      dispatch({
        type: 'user/fetchCurrent',
      });
    }
  }, []);

  const handleMenuCollapse = (payload: boolean): void => {
    if (dispatch) {
      dispatch({
        type: 'global/changeLayoutCollapsed',
        payload,
      });
    }
  };

  return (
    <>
      <ProLayout
        logo={logo}
        onCollapse={handleMenuCollapse}
        onMenuHeaderClick={() => history.push('/')}
        menuItemRender={(menuItemProps, defaultDom) => {
          if (menuItemProps?.isUrl || !menuItemProps?.path) {
            return defaultDom;
          }
          return (
            <Link to={menuItemProps?.path}>
              <>{defaultDom}</>
            </Link>
          );
        }}
        breadcrumbRender={(routers = []) => {
          return [
            {
              path: '/',
              breadcrumbName: '首页',
            },
            ...routers,
          ];
        }}
        itemRender={(currRoute, params, routes, paths) => {
          const first = routes.indexOf(currRoute) === 0;
          return first ? (
            <Link to={paths.join('/')}>{currRoute.breadcrumbName}</Link>
          ) : (
            <span>{currRoute.breadcrumbName}</span>
          );
        }}
        footerRender={() => defaultFooterDom}
        menuDataRender={() => renderMenuData}
        rightContentRender={() => <RightContent />}
        {...props}
        {...mySettings}
        // menuRender={false} // 去除菜单
        // headerRender={false} // 去除头
        // breadcrumbRender={() => []} // 去除面包屑
      >
        {children}
      </ProLayout>
    </>
  );
};

export default connect(({ global, settings, user }: ConnectState) => ({
  collapsed: global.collapsed,
  settings,
  currentUser: user.currentUser,
}))(BasicLayout);
