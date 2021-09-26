// 插件
import babel from '@rollup/plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';
import del from 'rollup-plugin-delete';
// import external from 'rollup-plugin-peer-deps-external';

const setRollup = (pkg, plugins, overridePlugins) => ({
  input: pkg.source,
  output: [
    { file: pkg.main, format: 'cjs' },
    { file: pkg.module, format: 'esm' },
  ],
  external: Object.keys(pkg.peerDependencies || {}),
  plugins:
    overridePlugins ||
    [
      del({ targets: ['dist/*'] }),
      // json
      json(),

      // jsx
      babel({
        exclude: 'node_modules/**',
        presets: [
          '@babel/preset-react',
          ['@babel/preset-env', { targets: { node: 'current' } }],
          // '@babel/preset-typescript',
          '@emotion/babel-preset-css-prop',
        ],
        plugins: ['@emotion/babel-plugin', 'babel-plugin-macros'],
      }),
      commonjs({
        transformMixedEsModules: true,
        defaultIsModuleExports: 'auto',
      }),

      // external(),
    ].concat(plugins || []),
});

export default setRollup;
