import { Helmet, HelmetProvider } from 'react-helmet-async';
import React from 'react';
import styles from './UserLayout.less';

export interface UserLayoutProps {}

const UserLayout: React.FC<UserLayoutProps> = (props) => {
  const { children } = props;

  return (
    <HelmetProvider>
      <Helmet>
        <meta name="description" content="登录" />
      </Helmet>

      <div className={styles.container}>
        <div className={styles.content}>{children}</div>
      </div>
    </HelmetProvider>
  );
};

export default UserLayout;
