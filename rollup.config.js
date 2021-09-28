// 插件
import babel from '@rollup/plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';
import del from 'rollup-plugin-delete';
import dts from 'rollup-plugin-dts';

export const override = (pkg, callback) => {
  // 打包代码
  const jsConfig = {
    input: pkg.source,
    output: [
      { file: pkg.main, format: 'cjs' },
      { file: pkg.module, format: 'esm' },
    ],
    external: Object.keys(pkg.peerDependencies || {}),
    plugins: [
      del({ targets: ['dist/*'] }),
      // json
      json(),
      // jsx
      babel({
        exclude: 'node_modules/**',
        extensions: ['.js', '.jsx'],
        presets: [
          '@babel/preset-react',
          ['@babel/preset-env', { targets: { node: 'current' } }],
          '@emotion/babel-preset-css-prop',
        ],
        plugins: ['@emotion/babel-plugin', 'babel-plugin-macros'],
      }),
      commonjs({
        transformMixedEsModules: true,
        defaultIsModuleExports: 'auto',
      }),
    ],
  };

  // 打包代码
  const tsConfig = {
    input: pkg.source,
    output: [
      { file: pkg.main, format: 'cjs' },
      { file: pkg.module, format: 'esm' },
    ],
    external: Object.keys(pkg.peerDependencies || {}),
    plugins: [
      del({ targets: ['dist/*'] }),
      // json
      json(),
      // jsx
      babel({
        babelHelpers: 'bundled',
        exclude: 'node_modules/**',
        extensions: ['.ts', '.tsx'],
        presets: [
          '@babel/preset-react',
          ['@babel/preset-env', { targets: { node: 'current' } }],
          '@babel/preset-typescript',
          '@emotion/babel-preset-css-prop',
        ],
        plugins: ['@emotion/babel-plugin', 'babel-plugin-macros'],
      }),

      commonjs({
        extensions: ['.ts', '.tsx'],
        exclude: 'node_modules/**',
        transformMixedEsModules: true,
        defaultIsModuleExports: 'auto',
      }),
    ],
  };

  const dtsConfig = {
    input: pkg.source,
    output: [
      { file: pkg.main.replace('.js', '.d.ts'), format: 'cjs' },
      { file: pkg.module.replace('.js', '.d.ts'), format: 'esm' },
    ],
    external: Object.keys(pkg.peerDependencies || {}),
    plugins: [
      // del({ targets: ['dist/*'] }),
      json(),
      dts(),
      // jsx
      babel({
        exclude: 'node_modules/**',
        extensions: ['.ts', '.tsx'],
        presets: [
          '@babel/preset-react',
          ['@babel/preset-env', { targets: { node: 'current' } }],
          '@babel/preset-typescript',
          '@emotion/babel-preset-css-prop',
        ],
        plugins: ['@emotion/babel-plugin', 'babel-plugin-macros'],
      }),
      commonjs({
        extensions: ['.ts', '.tsx'],
        exclude: 'node_modules/**',
        transformMixedEsModules: true,
        defaultIsModuleExports: 'auto',
      }),
    ],
  };

  return callback({ jsConfig, tsConfig, dtsConfig });
};
