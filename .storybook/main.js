const path = require('path');

const toPath = (_path) => path.join(process.cwd(), _path);

module.exports = {
  stories: [
    '../packages/**/*.stories.mdx',
    '../packages/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],

  webpackFinal: async (config) => {
    config.resolve.alias = Object.assign({}, config.resolve.alias, {
      '@emotion/core': toPath('node_modules/@emotion/react'),
      '@emotion/styled': toPath('node_modules/@emotion/styled'),
      'emotion-theming': toPath('node_modules/@emotion/react'),
    });

    config.module.rules.push(
      {
        test: /\.(ts|tsx)$/,
        use: [
          {
            loader: require.resolve('babel-loader'),
            options: {
              presets: [
                '@babel/preset-react',
                ['@babel/preset-env', { targets: { node: 'current' } }],
                '@babel/preset-typescript',
                '@emotion/babel-preset-css-prop',
              ],
              plugins: ['@emotion/babel-plugin', 'babel-plugin-macros'],
            },
          },
        ],
      },
      {
        test: /\.(less)$/,
        use: [
          {
            loader: require.resolve('style-loader'),
          },
          {
            loader: require.resolve('css-loader'),
          },
          {
            loader: require.resolve('less-loader'),
            options: {
              // lessOptions: {
              strictMath: true,
              noIeCompat: true,
              // },
            },
          },
        ],
      },
    );

    config.resolve.extensions.push('.tsx', '.ts', '.less');

    return config;
  },
};
