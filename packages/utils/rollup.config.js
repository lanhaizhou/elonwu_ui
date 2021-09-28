import pkg from './package.json';

import babel from '@rollup/plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';
import del from 'rollup-plugin-delete';

import { override } from '../../rollup.config';

const config = override(pkg, ({ jsConfig }) =>
  Object.assign({}, jsConfig, {
    plugins: [
      del({ targets: ['dist/*'] }),
      // json
      json(),

      // jsx
      babel({
        exclude: 'node_modules/**',
        presets: [['@babel/preset-env', { targets: { node: 'current' } }]],
      }),
      commonjs({
        transformMixedEsModules: true,
        defaultIsModuleExports: 'auto',
      }),
    ],
  }),
);

export default config;
