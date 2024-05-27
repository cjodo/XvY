import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  env: {
    gh_username: process.env.GH_USERNAME,
    gh_password: process.env.GH_PASSWORD
  }
});
