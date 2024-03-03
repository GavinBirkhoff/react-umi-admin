import { defineConfig } from 'umi';
import define from './config/define';
import routes from './config/routes';

export default defineConfig({
  routes,
  define,
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
