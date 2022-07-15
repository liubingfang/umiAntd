import * as React from 'react';
import { connect } from 'umi';
import { Dropdown, Menu, Avatar } from 'antd';

import type { ConnectState } from '@/models/connect';
import type { CurrentUser } from '@/models/user';

export interface AvatarDropdownPropsType {
  currentUser: CurrentUser;
}

class AvatarDropdown extends React.Component<AvatarDropdownPropsType> {
  render(): React.ReactNode {
    const { currentUser } = this.props;
    console.log('this.props.currentUser :>> ', this.props.currentUser);

    return (
      <div>
        <Dropdown
          overlay={
            <Menu
              items={[
                {
                  key: '1',
                  label: (
                    <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                      1st menu item
                    </a>
                  ),
                },
              ]}
            />
          }
        >
          <div>
            <Avatar
              size="small"
              // className={styles.avatar}
              src={'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png'}
              alt="avatar"
            />
            刘炳芳
          </div>
        </Dropdown>
      </div>
    );
  }
}

export default connect(({ user }: ConnectState) => ({
  currentUser: user.currentUser,
}))(AvatarDropdown);
