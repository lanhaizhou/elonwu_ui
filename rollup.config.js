// 插件
import babel from '@rollup/plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';
import del from 'rollup-plugin-delete';
import typescript from 'rollup-plugin-typescript';
import dts from 'rollup-plugin-dts';

const setRollup = (pkg, plugins, overridePlugins) => {
  return [
    // 打包代码
    {
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

          typescript(),
          // jsx
          babel({
            exclude: 'node_modules/**',
            resolve: ['.js', 'jsx', 'ts', 'tsx'],
            presets: [
              '@babel/preset-react',
              ['@babel/preset-env', { targets: { node: 'current' } }],
              '@babel/preset-typescript',
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
    },

    {
      input: pkg.source,
      output: [
        { file: pkg.main.replace('.js', '.d.ts'), format: 'es' },
        { file: pkg.module.replace('.js', '.d.ts'), format: 'es' },
      ],
      external: Object.keys(pkg.peerDependencies || {}),
      plugins: [
        // del({ targets: ['dist/*'] }),
        json(),
        typescript(),
        dts(),
        // jsx
        babel({
          exclude: 'node_modules/**',
          resolve: ['.js', 'jsx', 'ts', 'tsx'],
          presets: [
            '@babel/preset-react',
            ['@babel/preset-env', { targets: { node: 'current' } }],
            '@babel/preset-typescript',
            '@emotion/babel-preset-css-prop',
          ],
          plugins: ['@emotion/babel-plugin', 'babel-plugin-macros'],
        }),
        commonjs({
          transformMixedEsModules: true,
          defaultIsModuleExports: 'auto',
        }),
      ],
    },
  ];
};

export default setRollup;
