import React from 'react';
import { Dropdown } from 'antd';
import classNames from 'classnames';
import styles from './index.less';

declare type OverlayFunc = () => React.ReactNode;

export interface HeaderDropdownPropsType {
  overlayClassName?: string;
  overlay: React.ReactNode | OverlayFunc | any;
  placement?: 'bottomLeft' | 'bottomRight' | 'topLeft' | 'topCenter' | 'topRight' | 'bottomCenter';
}

const HeaderDropdown: React.FC<HeaderDropdownPropsType> = ({
  overlayClassName: cls,
  ...restProps
}) => {
  return <Dropdown overlayClassName={classNames(styles.container, cls)} {...restProps} />;
};

export default HeaderDropdown;
