import { defineConfig } from "umi";
import routes from "./routes";

export default defineConfig({
  routes,
  plugins: [
    '@umijs/plugins/dist/initial-state',
    '@umijs/plugins/dist/model',
  ],
  initialState: {},
  model: {},
  npmClient: 'pnpm',
});
