import path from 'path';

import resolveAlias from '@rollup/plugin-alias';
import {
  defineConfig
} from 'wmr';

// Full list of options: https://wmr.dev/docs/configuration
export default defineConfig(async () => {
  return {
    alias: {
      'react': 'preact/compat',
      'react-dom': 'preact/compat'
    },
    plugins: [
      resolveAlias({
        entries: [
          { find: `~`, replacement: path.resolve(`public`) }
        ]
      })
    ],
    port: 8099 // TODO: dotenv
  };
});
