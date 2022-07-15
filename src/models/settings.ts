import type { Reducer } from 'umi';
import defaultSettings from 'config/defaultSettings';

import type { DefaultSettings } from 'config/defaultSettings';

export interface SettingModelType {
  namespace: 'settings';
  state: DefaultSettings;
  reducers: {
    changeSetting: Reducer<DefaultSettings>;
  };
}

const SettingModel: SettingModelType = {
  namespace: 'settings',
  state: defaultSettings,
  reducers: {
    changeSetting(state = defaultSettings, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};

export default SettingModel;
