import React, { useEffect } from 'react';
import { notification, Button } from 'antd';
import { useDispatch, useSelector, history, Dispatch } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';

const Test = (): React.ReactElement => {
  const dispatch = useDispatch<Dispatch>();
  const state = useSelector((state) => state);

  return (
    <PageContainer title={false}>
      <Button
        onClick={() => {
          dispatch({
            type: 'test/fetch',
            payload: {
              current: 1,
              pages: 20,
            },
          });
        }}
      >
        点我
      </Button>
    </PageContainer>
  );
};

export default Test;
