/* eslint-env node */

import path from 'path';

import alias from '@rollup/plugin-alias';
import replace from '@rollup/plugin-replace';
import nomodule from '@wmr-plugins/nomodule';
import dotenv from 'dotenv';

dotenv.config();

export default function(config) {
  config.plugins.push({
    name: `root-resolve`,
    resolveId(spec, importer) {
      return spec.startsWith(`~/`)
        ? path.resolve(config.cwd, spec.slice(2))
        : null;
    }
  });
  nomodule(config);
}
