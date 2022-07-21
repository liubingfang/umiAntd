import type { Reducer } from 'redux';
import type { Effect, Subscription } from 'dva';

export interface GlobalModelStateType {
  collapsed: boolean;
}

export interface GlobalModelType {
  namespace: 'global';
  state: GlobalModelStateType;
  effects: {
    fetchNotices: Effect;
  };
  reducers: {
    changeLayoutCollapsed: Reducer<GlobalModelStateType>;
  };
  subscriptions: { setup: Subscription };
}

const GlobalModel: GlobalModelType = {
  namespace: 'global',
  state: {
    collapsed: false,
  },
  effects: {
    *fetchNotices({ payload }, { call, put }) {
      // const result = yield call("")
    },
  },
  reducers: {
    changeLayoutCollapsed(state = { collapsed: false }, { payload }): GlobalModelStateType {
      return {
        ...state,
        collapsed: payload,
      };
    },
  },
  subscriptions: {
    setup({ history }): void {
      history.listen(({ pathname, search }): void => {
        console.log('window.ga :>> ', window.ga);
      });
    },
  },
};

export default GlobalModel;
