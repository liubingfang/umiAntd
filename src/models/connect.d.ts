import type { GlobalModelStateType } from './global';
import type { DefaultSettings as SettingModelState } from 'config/defaultSettings';
import type { UserModelState } from './user';

export { GlobalModelStateType, SettingModelState };

export interface Loading {
  global: boolean;
  effects: {
    [key: string]: boolean | undefined;
  };
  models: {
    global?: boolean;
    settings?: boolean;
    user?: boolean;
  };
}

export interface ConnectState {
  global: GlobalModelStateType;
  loading: Loading;
  settings: SettingModelState;
  user: UserModelState;
}
