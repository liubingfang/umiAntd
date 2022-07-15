import { queryAsyncPost } from '@/services/api';
import type { Effect, Reducer } from 'umi';

export type Permission = '1' | '2' | '3' | '4';

export interface MenuNav {
  id: string;
  icon?: string;
  menuType: number;
  name: string;
  path: string;
  permission?: Permission; //1：董事， 2：总经理， 3： 主管， 4： 经理
  children?: MenuNav[];
  routes?: MenuNav[];
}

export interface CurrentUser {
  menuNav?: MenuNav[];
  userInfo?: {
    id?: any;
    avatar?: any;
    username?: string;
    nickname?: string;
    mobile?: number;
    email?: string;
    password?: any;
    remark?: string;
  } | null;
}

export interface UserModelState {
  currentUser: CurrentUser;
}

export interface UserModelType {
  namespace: 'user';
  state: UserModelState;
  effects: {
    fetchCurrent: Effect;
  };
  reducers: {
    save: Reducer<UserModelState>;
  };
}

const UserModel: UserModelType = {
  namespace: 'user',
  state: {
    currentUser: {
      menuNav: [], // 菜单字典
      userInfo: null, // 用户详细信息
    },
  },
  effects: {
    *fetchCurrent(_, { call, put }) {
      const res = yield call(queryAsyncPost, '/sys/currentUser');

      if (res) {
        const { code, result } = res;
        const { menuNav, userInfo } = result;
        if (code === 200) {
          yield put({
            type: 'save',
            payload: {
              currentUser: {
                menuNav: menuNav ?? [],
                userInfo: userInfo,
              },
            },
          });
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

export default UserModel;
