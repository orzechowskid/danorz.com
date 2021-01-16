/* eslint-env node */

import path from 'path';

import alias from '@rollup/plugin-alias';
import replace from '@rollup/plugin-replace';
import dotenv from 'dotenv';

dotenv.config();

export async function start(config) {
  config.plugins = [
    ...config.plugins,
    replace({
      'process.env.API_URL': JSON.stringify(process.env.API_URL)
    }),
    alias({
      entries: [{
        find: '~',
        replacement: path.resolve(`./public`)
      }]
    })
  ];
}
