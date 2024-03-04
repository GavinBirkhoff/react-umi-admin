import { defineConfig } from 'umi';
import define from './config/define';
import routes from './config/routes';

export default defineConfig({
  hash: true,
  routes,
  define,
  headScripts: [
    // 解决首次加载时白屏的问题
    { src: '/scripts/loading.js', async: true },
  ],
  plugins: [
    '@umijs/plugins/dist/initial-state',
    '@umijs/plugins/dist/model',
    '@umijs/plugins/dist/locale',
  ],
  initialState: {},
  model: {},
  locale: {
    // 默认使用 src/locales/zh-CN.ts 作为多语言文件
    default: 'zh-CN',
    baseSeparator: '-',
  },
  npmClient: 'pnpm',
});
