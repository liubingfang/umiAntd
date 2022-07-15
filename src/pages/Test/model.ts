import { queryPost } from '@/services/api';
import type { Reducer } from 'redux';
import type { Effect } from 'dva';

export interface TestModelStateType {
  menuList: any[];
}

export interface TestModelType {
  namespace: 'test';
  state: TestModelStateType;
  effects: {
    fetch: Effect;
  };
  reducers: {
    save: Reducer;
  };
}

const TestModel: TestModelType = {
  namespace: 'test',
  state: {
    menuList: [],
  },
  effects: {
    *fetch({ payload }, { call, put }) {
      const res = yield call(queryPost, '/api/test', { ...payload });

      console.log('res :>> ', res);
    },
  },
  reducers: {
    save(state, { ...payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};

export default TestModel;
