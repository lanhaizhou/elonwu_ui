import React from 'react';
import { Empty } from '../src';

export default {
  title: 'Components/Base/Empty',
  component: Empty,

  // 参数值、参数文档
  argTypes: {
    desc: {
      name: 'desc',
      description: '描述文字',
      type: 'string',
      defaultValue: '自定义说明文字',
      control: { type: 'string' },
      table: {
        type: {
          summary: 'string',
        },
      },
    },
    size: {
      name: 'size',
      description: '图片大小',
      type: 'number',
      defaultValue: 64,
      control: { type: 'number' },
      table: {
        type: {
          summary: 'number',
        },
      },
    },
  },

  // 组件文档
  parameters: {
    docs: {
      // 组件整体描述
      description: {
        component: 'Empty',
      },
      // 代码示例
      source: {
        type: 'code',
        code: `<Empty />`,
      },
    },
  },
};

export const EmptyStory = (args) => <Empty {...args} />;
