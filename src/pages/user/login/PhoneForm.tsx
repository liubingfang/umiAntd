import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'umi';
import { Form, Row, Col, Alert, Button } from 'antd';
import renderFormItem from '@/components/RenderFormItem/index';
import { SecurityScanOutlined } from '@ant-design/icons';

import styles from './index.less';

import type { LoginStateProps } from '@/models/login';
import type { RenderFormItemType } from '@/pages/index';

interface IRootState {
  login: LoginStateProps;
}

export interface PhoneFormPropsType {
  formItems: RenderFormItemType[];
}

const errorMsg = {
  100: '验证码错误',
  101: '用户名或密码错误',
};

const countTotal = 5;

const PhoneForm: React.FC<PhoneFormPropsType> = (props) => {
  const { formItems } = props;
  const dispatch = useDispatch();
  const { login } = useSelector((state: IRootState) => state);
  const [form] = Form.useForm();

  const [captchaText, setCaptchaText] = useState<string>('获取验证码');
  const [disabled, setDisabled] = useState<boolean>(false);
  const intervalRef = useRef<number | undefined>();

  const { statusCode = 200, loading } = login;

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const onFinish = (values: any) => {
    dispatch({
      type: 'login/mobileLogin',
      payload: values,
    });
  };

  const countDownHandle = () => {
    setDisabled(true);
    let countNum = 0;
    intervalRef.current = window.setInterval(() => {
      countNum += 1;
      if (countNum > countTotal) {
        clearInterval(intervalRef.current);
        countNum = 0;
        setCaptchaText('获取验证码');
        setDisabled(false);
      } else {
        setCaptchaText(`${countTotal - countNum}s后重新获取`);
      }
    }, 1000);
  };

  const onGetCaptcha = () => {
    form
      .validateFields(['mobile'])
      .then((values: any) => {
        countDownHandle();
        dispatch({
          type: 'login/fetchGetMobileCaptcha',
          payload: values,
        });
      })
      .catch((errorInfo) => {
        console.log('errorInfo :>> ', errorInfo);
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
            <Button size="large" onClick={onGetCaptcha} disabled={disabled}>
              {captchaText}
            </Button>
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
        <Form onFinish={onFinish} form={form}>
          <Row>{[...renderItem(), extraFormItem(), operatingControl()]}</Row>
        </Form>
      </div>
    </div>
  );
};

export default PhoneForm;
