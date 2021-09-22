module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true, // 允许使用 node 环境全局变量， 比如测试代码中的断言
    // jest: true,
  },
  extends: [
    // 'airbnb',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['prettier', 'react'],
  rules: {
    'no-console': 'warn', // 警告代码中保留了 console
    'prettier/prettier': 2,
    'import/no-extraneous-dependencies': 'off',
    'react/prop-types': 'off', // 避免自定义属性无法通过检测
    'react/display-name': 'off', // 避免无法直接使用匿名函数
    // 'import/no-extraneous-dependencies': [
    //   'error',
    //   {
    //     devDependencies: false,
    //     optionalDependencies: false,
    //     peerDependencies: false,
    //   },
    // ],
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }], // 允许在 js 文件中 使用 jsx 语法
    'no-unused-vars': 'off',
  },
  settings: {
    'import/resolver': ['node'],
  },
};
