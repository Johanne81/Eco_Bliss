const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:8080",
    setupNodeEvents(on, config) {},
    env: {
      apiUrl: "http://localhost:8081",
      username: "test2@test.fr",
      password: "testtest",
    },
  },
});
