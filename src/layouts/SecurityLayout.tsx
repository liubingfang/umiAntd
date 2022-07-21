import { PageLoading } from '@ant-design/pro-layout';
import * as React from 'react';
import { connect, Redirect } from 'umi';

import type { ConnectProps } from 'umi';
import type { CurrentUser } from '@/models/user';
import type { ConnectState } from '@/models/connect';

export interface SecurityLayoutProps extends ConnectProps {
  loading?: boolean;
  currentUser?: CurrentUser;
}

export interface SecurityLayoutState {
  isReady: boolean;
}

class SecurityLayout extends React.Component<SecurityLayoutProps, SecurityLayoutState> {
  state: SecurityLayoutState = {
    isReady: false,
  };

  componentDidMount() {
    this.setState({
      isReady: true,
    });

    const { dispatch } = this.props;

    if (dispatch) {
      dispatch({
        type: 'user/fetchCurrent',
      });
    }
  }

  render(): React.ReactNode {
    const { isReady } = this.state;
    const { children, loading, currentUser } = this.props;

    const isLogin = !!currentUser?.userInfo?.id;

    console.log('currentUser?.userInfo?.id :>> ', currentUser?.userInfo?.id);

    if ((!isLogin && loading) || !isReady) {
      return <PageLoading />;
    }
    if (!isLogin && window.location.pathname !== '/user/login') {
      return <Redirect to="/user/login" />;
    }
    return children;
  }
}

export default connect(({ user, loading }: ConnectState) => ({
  loading: loading?.models?.user,
  currentUser: user?.currentUser,
}))(SecurityLayout);
