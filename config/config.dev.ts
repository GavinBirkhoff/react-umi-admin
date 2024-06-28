import { defineConfig } from 'umi';

// 用于本地开发环境, 用于本地高校开发
export default defineConfig({
  mock: process.env.MOCK_ENABLED === 'false' ? false : {},
  proxy: {
    '/dev-api': {
      target: 'http://jsonplaceholder.typicode.com/',
      changeOrigin: true,
      pathRewrite: { '^/dev-api': '' },
    },
  },
});
