import React from 'react';

import { Tag } from '../src';

export default {
  title: 'Components/Base/Tag',
  component: Tag,
  // 组件文档
  parameters: {
    docs: {
      // 组件整体描述
      description: {
        component: 'Tag',
      },
      // 代码示例
      source: {
        type: 'code',
        code: `<Tag>This is a Tag</Tag>`,
      },
    },
  },
};

export const TagStory = (args) => {
  return <Tag {...args}>This is a Tag</Tag>;
};
