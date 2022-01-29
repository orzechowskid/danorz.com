/* eslint-env node */

module.exports = {
  moduleNameMapper: {
    "^~/(.*)$": "<rootDir>/public/$1"
  },
  name: `frontend`,
  setupFiles: [
    `<rootDir>/__tests__/index.js`
  ],
  testEnvironment: `jsdom`
};
