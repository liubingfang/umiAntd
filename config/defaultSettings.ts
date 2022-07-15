import type { Settings as ProSettings } from '@ant-design/pro-layout';

const env = process.env.NODE_ENV;

export type DefaultSettings = ProSettings & {
  debugLocal: boolean;
  debugLocalDomain: string;
  isLocalMenus: boolean;
};

const defaultSettings = {
  navTheme: 'light',
  primaryColor: '#1890ff',
  layout: 'mix',
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: true,
  menu: {
    locale: true,
  },
  title: '系统脚手架',

  debugLocal: false,
  debugLocalDomain: 'http://192.168.22.68:9000',
  isLocalMenus: env === 'development',
} as DefaultSettings;

export default defaultSettings;
