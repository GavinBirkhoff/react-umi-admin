import { defineConfig } from "umi";
import routes from "./config/routes";
import define from "./config/define";

export default defineConfig({
  routes,
  define,
  plugins: [
    '@umijs/plugins/dist/initial-state',
    '@umijs/plugins/dist/model',
  ],
  initialState: {},
  model: {},
  npmClient: 'pnpm',
});
