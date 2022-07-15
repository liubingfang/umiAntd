import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'umi';
import { Form, Row, Col, Alert, Button, Input } from 'antd';
import QRcode from './components/QRcode/index';
import renderFormItem from '@/components/RenderFormItem/index';
import { SecurityScanOutlined } from '@ant-design/icons';

import styles from './index.less';

import type { LoginStateProps } from '@/models/login';
import type { RenderFormItemType } from '@/pages/index';
import type { Dispatch } from 'redux';

interface IRootState {
  login: LoginStateProps;
}

export interface AccountFormPropsType {
  formItems: RenderFormItemType[];
}

const errorMsg = {
  100: '验证码错误',
  101: '用户名或密码错误',
};

const AccountForm: React.FC<AccountFormPropsType> = (props) => {
  const { formItems } = props;
  const dispatch = useDispatch();
  const { login } = useSelector((state: IRootState) => state);
  const { image = '', isRefreshCode, statusCode = 200, key, loading } = login;

  console.log('image :>> ', image);

  const refreshCode = () => {
    dispatch({
      type: 'login/fetchGetCode',
    });
  };

  useEffect(() => {
    if (statusCode < 200 && isRefreshCode) {
      refreshCode();
    }
  }, [isRefreshCode, statusCode]);

  const onFinish = (values: any) => {
    dispatch({
      type: 'login/accountLogin',
      payload: {
        ...values,
        key,
      },
    });
  };

  const operatingControl = () => {
    return (
      <Col span={24} key="operatingControl">
        <Button
          className={styles.submitBtn}
          type="primary"
          size="large"
          loading={loading}
          htmlType="submit"
        >
          登录
        </Button>
      </Col>
    );
  };

  const extraFormItem = () => {
    return (
      <Col span={24} key="code">
        <div className={styles.qrcodeBox}>
          <div style={{ width: '60%' }}>
            {renderFormItem({
              widget: 'AInput',
              name: 'code',
              label: null,
              rules: [
                {
                  required: true,
                  message: '请输入验证码',
                },
              ],
              widgetProps: {
                placeholder: `请输入验证码`,
                prefix: <SecurityScanOutlined style={{ color: 'rgba(0,0,0,.25)' }} />,
                size: 'large',
              },
            })}
          </div>
          <div>
            <QRcode image={image} onChange={refreshCode} />
          </div>
        </div>
      </Col>
    );
  };

  const renderItem = () => {
    return formItems.map((item) => {
      const { colSpan = 24 } = item;

      return (
        <Col span={colSpan} key={item?.name}>
          {renderFormItem(item)}
        </Col>
      );
    });
  };

  return (
    <div>
      {Object.keys(errorMsg)?.includes(`${statusCode}`) ? (
        <div className={styles.errorMsg}>
          <Alert message={errorMsg[statusCode]} type="error" showIcon />
        </div>
      ) : null}
      <div className={styles.content}>
        <Form onFinish={onFinish}>
          <Row>{[...renderItem(), extraFormItem(), operatingControl()]}</Row>
        </Form>
      </div>
    </div>
  );
};

export default AccountForm;
