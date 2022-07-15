import React from 'react';
import { history } from 'umi';
import { Result, Button } from 'antd';

const Exception404 = () => {
  const clearState = () => {
    history.goBack();
  };
  return (
    <Result
      status="404"
      title="404"
      subTitle="抱歉，你访问的接口或页面不存在."
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

export default Exception404;
