/**
 * 在生产环境 代理是无法生效的，所以这里没有生产环境的配置
 *
 */
import defaultSettings from './defaultSettings';

const { debugLocal, debugLocalDomain } = defaultSettings;

const targetSysUrl = debugLocal ? debugLocalDomain : 'http://yapi.yunxiaowei.cn/mock/168';
const targetApiUrl = debugLocal ? debugLocalDomain : 'http://yapi.yunxiaowei.cn/mock/172';

export default {
  '/api/sys': {
    target: targetSysUrl,
    changeOrigin: true,
    pathRewrite: { '^/api': '' },
  },
  '/api': {
    target: targetApiUrl,
    changeOrigin: true,
    pathRewrite: { '^/api': '' },
  },
};
