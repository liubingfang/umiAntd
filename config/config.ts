// https://umijs.org/config/
import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import pageRouter from './router.config';
import proxy from './proxy';

export default defineConfig({
  hash: true,
  antd: {}, // 启用antd
  dva: {
    immer: true, // 使用dva
    hmr: true, // 开启dva model 热刷新
  },
  locale: {
    // default zh-CN
    default: 'zh-CN',
    // default true, when it is true, will use `navigator.language` overwrite default
    antd: true, // 开启antd国际化
    title: true, // 开启标题国际化
    baseNavigator: true,
  },
  // 提速方法，umi必须为3.5版本及以上
  // mfsu: {},
  // webpack5: {},
  // fastRefresh: {},
  // 打包文件结构变化，优化用户体验
  dynamicImport: {
    loading: '@/components/PageLoading/index', // 防止切换页面出现卡顿
  },
  targets: {
    ie: 11, // 兼容ie11
  },
  routes: pageRouter,
  proxy,
  theme: {
    // https://ant.design/docs/react/customize-theme-cn
    '@primary-color': defaultSettings?.primaryColor,
  },
  // @ts-ignore
  title: defaultSettings?.title,
  ignoreMomentLocale: true,
  // 配置是否需要生成额外用于描述产物的 manifest 文件
  manifest: {
    basePath: '/', // 给所有文件路径加前缀,默认会生成 asset-manifest.json
  },
  // publicPath: './', // 当打包时，给静态文件路径前添加设置的值
  // @ts-ignore
  chainWebpack(memo, { env, webpack, createCSSRule }) {
    // 设置 alias
    memo.resolve.alias.set('config', __dirname);
  },
});
