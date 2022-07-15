import { queryAsync, queryPost } from '@/services/api';
import { history } from 'umi';
import { message } from 'antd';

import { delay } from '@/utils/common';

import type { Reducer, Effect } from 'umi';

export interface LoginStateProps {
  image?: string;
  key?: string;
  isRefreshCode?: boolean;
  statusCode?: number;
  loading?: boolean;
  mobiles?: { key: string; value: string }[];
  mobileValid?: boolean;
}

export interface LoginModelType {
  namespace: 'login';
  state: LoginStateProps;
  effects: {
    fetchGetCode: Effect;
    accountLogin: Effect;
    fetchGetMobileCaptcha: Effect;
    mobileLogin: Effect;
  };
  reducers: {
    save: Reducer<LoginStateProps>;
  };
}

const Model: LoginModelType = {
  namespace: 'login',
  state: {
    key: '',
    image: '',
    statusCode: 200,
    loading: false,
    isRefreshCode: false,
    mobiles: [],
    mobileValid: false,
  },
  effects: {
    *fetchGetCode(_, { call, put }) {
      const response = yield call(queryAsync, '/sys/getCode');
      if (response) {
        const { code, result } = response;

        if (code === 200) {
          const { key, image } = result;
          yield put({
            type: 'save',
            payload: {
              key,
              image,
            },
          });
        }
      }
    },
    *accountLogin({ payload }, { call, put }) {
      yield put({
        type: 'save',
        payload: {
          loading: true,
          isRefreshCode: false,
        },
      });
      Object.assign(payload, {
        mobileValid: false,
      });

      const formData = new FormData();
      Object.keys(payload).forEach((key) => {
        formData.append(key, payload[key]);
      });

      const response = yield call(queryPost, '/sys/account/login', formData);

      if (response) {
        const { code, result } = response;

        yield put({
          type: 'save',
          payload: {
            statusCode: code,
            isRefreshCode: code !== 200,
            loading: false,
          },
        });

        if (code === 200) {
          const { token } = result;
          localStorage.setItem('token', token);

          yield call(delay, 300);

          history.replace('/');
        } else if (code === 202) {
          const { mobiles = [] } = result;

          yield put({
            type: 'save',
            payload: {
              mobiles: mobiles.map((m: number) => ({ key: m, value: m })),
              mobileValid: true,
            },
          });
        }
      }
    },
    *fetchGetMobileCaptcha({ payload }, { call }) {
      const response = yield call(queryPost, '/sys/getMobileCaptcha', payload);
      if (response) {
        const { code } = response;

        if (code === 200) {
          message.success('短信发送成功');
        }
      }
    },
    *mobileLogin({ payload }, { call, put }) {
      yield put({
        type: 'save',
        payload: {
          loading: true,
        },
      });

      const response = yield call(queryPost, '/sys/mobileLogin', payload);

      yield put({
        type: 'save',
        payload: {
          loading: false,
        },
      });

      if (response) {
        const { code, result } = response;

        yield put({
          type: 'save',
          payload: {
            statusCode: code,
          },
        });

        if (code === 200) {
          const { token } = result;
          localStorage.setItem('token', token);
          yield call(delay, 300);
          history.replace('/');
        }
      }
    },
  },

  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};

export default Model;
