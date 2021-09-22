module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'init', // 初始化
        'feat', // 新功能
        'fix', // 修复 bug
        'docs', // 文档
        'style', // 代码格式（无关功能）
        'refactor', // 对已有功能的重构（既不是新功能，也不是修改 bug）
        'test', // 增加测试
        'revert', // 回滚
        'config', // 构建配置或工具变动
        'build', // 打包
        'chore', // 其他更新
      ],
    ],
    'subject-empty': [2, 'never'], // 内容为空
    'subject-case': [
      2,
      'never',
      ['sentence-case', 'start-case', 'pascal-case', 'upper-case'],
    ],
    'subject-full-stop': [2, 'never', '.'],
    'type-case': [2, 'always', 'lower-case'],
    'type-empty': [2, 'never'], // 类型为空
  },
};
