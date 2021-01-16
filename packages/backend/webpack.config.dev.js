const path = require('path');

const ProgressBarWebpackPlugin = require('progress-bar-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

const entryPath = path.resolve(__dirname, `bin`);
const outputPath = path.resolve(__dirname, `dist`);
const sourcePath = path.resolve(__dirname, `src`);

module.exports = {
  context: entryPath,
  devtool: `eval`,
  entry: `./index.dev`,
  externals: [ nodeExternals() ], // skips bundling of everything in /node_modules
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
    new ProgressBarWebpackPlugin()
  ],
  stats: `errors-warnings`,
  target: `node` // skips bundling of built-in modules
};
