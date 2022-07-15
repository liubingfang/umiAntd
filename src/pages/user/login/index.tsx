import React from 'react';
import { useSelector } from 'umi';
import styles from './index.less';
import defaultSettings from 'config/defaultSettings';
import AccountForm from './accountForm';
import PhoneForm from './phoneForm';

import pageConfig from './pageConfig';

import type { LoginStateProps } from '@/models/login';

const { title } = defaultSettings;

interface IRootState {
  login: LoginStateProps;
}
export interface LoginProps {}

const Login: React.FC<LoginProps> = () => {
  const { login } = useSelector((state: IRootState) => state);
  const { mobileValid, mobiles } = login;

  const { accountFormItems = [], phoneFormItems = [] } = pageConfig({
    mobilesOptions: mobiles ?? [],
  });

  return (
    <div className={styles.main}>
      <div className={styles.title}>{title}</div>
      {!mobileValid ? (
        <AccountForm formItems={accountFormItems} />
      ) : (
        <PhoneForm formItems={phoneFormItems} />
      )}
    </div>
  );
};

export default Login;
