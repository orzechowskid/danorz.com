/* eslint-disable-next-line import/no-nodejs-modules */
const path = require('path');

const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

const entryPath = path.resolve(__dirname, `bin`);
const outputPath = path.resolve(__dirname, `dist`);
const monorepoNodeModules = path.resolve(__dirname, `../../node_modules`);

module.exports = {
  context: entryPath,
  devtool: `eval`,
  entry: `./index.dev`,
  externals: [
    /* skip bundling (almost) everything in /node_modules */
    nodeExternals({
      allowlist: [ 'unique-string', 'crypto-random-string' ],
      additionalModuleDirs: [
        monorepoNodeModules
      ]
    })
  ],
  mode: `development`,
  node: {
    __dirname: false
  },
  output: {
    filename: `index.js`,
    libraryTarget: `commonjs2`,
    path: outputPath
  },
  plugins: [
    /* silence some harmless mongoose warnings */
    new webpack.ContextReplacementPlugin(/.*/)
  ],
  stats: `errors-warnings`,
  target: `node` // skips bundling of built-in modules
};
