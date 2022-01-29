/* eslint-env node */

module.exports = {
  moduleNameMapper: {
    "^~/(.*)$": "<rootDir>/public/$1"
  },
  name: `frontend`,
  setupFiles: [
    `<rootDir>/__test-setup__/index.js`
  ],
  testEnvironment: `jsdom`
};
