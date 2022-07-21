import * as React from 'react';
import { connect } from 'umi';
import { LogoutOutlined, SettingOutlined } from '@ant-design/icons';
import HeaderDropdown from '@/components/HeaderDropdown';
import styles from './index.less';

import type { ConnectState } from '@/models/connect';
import type { CurrentUser } from '@/models/user';
import { Avatar, Menu, Spin } from 'antd';

export interface AvatarDropdownPropsType {
  currentUser: CurrentUser;
}

class AvatarDropdown extends React.Component<AvatarDropdownPropsType> {
  onMenuClick = () => {};

  render(): React.ReactNode {
    const { currentUser } = this.props;
    console.log('this.props.currentUser :>> ', this.props.currentUser);

    const menuHeaderDropdown = (
      <Menu className={styles.menu} selectedKeys={[]} onClick={this.onMenuClick}>
        <Menu.Item key="settings">
          <SettingOutlined />
          个人中心
        </Menu.Item>

        <Menu.Divider />
        <Menu.Item key="logout">
          <LogoutOutlined />
          退出登录
        </Menu.Item>
      </Menu>
    );

    if (currentUser && currentUser.userInfo) {
      const { avatar, username } = currentUser.userInfo;

      return (
        <HeaderDropdown overlay={menuHeaderDropdown}>
          <span className={`${styles.action} ${styles.account}`}>
            <Avatar
              size="small"
              className={styles.avatar}
              src={
                !avatar
                  ? 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png'
                  : avatar
              }
              alt="avatar"
            />
            <span className={`${styles.name} anticon`}>{username}</span>
          </span>
        </HeaderDropdown>
      );
    }

    return <Spin size="small" style={{ marginLeft: 8, marginRight: 8 }} />;
  }
}

export default connect(({ user }: ConnectState) => ({
  currentUser: user.currentUser,
}))(AvatarDropdown);
