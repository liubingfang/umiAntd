import React from 'react';
import { history } from 'umi';
import { Result, Button } from 'antd';

const Exception500 = () => {
  const clearState = () => {
    history.goBack();
  };
  return (
    <Result
      status="500"
      title="500"
      subTitle="抱歉，服务器出错了"
      extra={
        <Button
          type="primary"
          onClick={() => {
            clearState();
          }}
        >
          刷新
        </Button>
      }
    />
  );
};

export default Exception500;
