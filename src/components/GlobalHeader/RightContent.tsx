import React from 'react';
import { connect } from 'umi';
import Avatar from './AvatarDropdown';

import type { Settings as ProSettings } from '@ant-design/pro-layout';
import type { ConnectProps } from 'umi';
import type { ConnectState } from '@/models/connect';

import styles from './index.less';

export interface GlobalHeaderRightPropsType extends Partial<ProSettings>, Partial<ConnectProps> {
  theme?: ProSettings['navTheme'] | 'realDark';
}

const GlobalHeaderRight: React.FC<GlobalHeaderRightPropsType> = (props) => {
  const { theme, layout } = props;

  let rootClassName = styles.right;

  if (theme === 'dark' && layout === 'top') {
    rootClassName = `${styles.right}  ${styles.dark}`;
  }

  return (
    <div className={rootClassName}>
      <Avatar />
    </div>
  );
};

export default connect(
  ({ settings }: ConnectState): Partial<GlobalHeaderRightPropsType> => ({
    theme: settings?.navTheme,
    layout: settings?.layout,
  }),
)(GlobalHeaderRight);
