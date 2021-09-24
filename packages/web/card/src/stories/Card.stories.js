import React from 'react';

import { Card } from '../index';

export default {
  title: 'Components/Base/Card',
  component: Card,
  argTypes: {
    full: {
      name: 'full',
      description: '是否 block',
      defaultValue: true,
      control: {
        type: 'boolean',
      },
    },
  },

  // 组件文档
  parameters: {
    docs: {
      // 组件整体描述
      description: {
        component: '卡片',
      },
      // 代码示例
      source: {
        type: 'code',
        code: `<Card full>This is a Card 卡片</Card>`,
      },
    },
  },
};

export const CardStory = (args) => {
  return <Card {...args}>This is a Card 卡片</Card>;
};
