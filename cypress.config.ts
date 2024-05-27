import { defineConfig } from "cypress";

export default defineConfig({
  env: {
    gh_username: process.env.GH_USERNAME,
    gh_password: process.env.GH_PASSWORD,
  },
  e2e: {
    setupNodeEvents(on, config) { },
    supportFile: false,
  },
  component: {
    devServer: {
      framework: 'next',
      bundler: 'webpack'
    },
  },
});
