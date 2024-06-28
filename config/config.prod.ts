import { defineConfig } from 'umi';

// 用于生产环境, 将来根据项目体积去配置
export default defineConfig({
  // https://umijs.org/docs/api/config#codesplitting
  codeSplitting: {
    jsStrategy: 'granularChunks',
  },
});
