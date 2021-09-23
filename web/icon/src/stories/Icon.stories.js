import React from 'react';
import { Icon } from '../index';

/**
 * 素材
 */
import star from '../assets/star.svg';
export default {
  title: 'Components/base/Icon',
  component: Icon,

  // 参数值、参数文档
  argTypes: {
    type: {
      name: 'type',
      description: '按钮类型',
      defaultValue: 'fill',
      options: ['fill', 'outline', 'ghost'],
      control: {
        type: 'select',
        labels: { fill: '填充', outline: '线框', ghost: '虚拟' },
      },

      table: {
        type: {
          summary: 'enum',
          detail: `
            fill: 填充, outline: 线框, ghost: 虚拟
          `,
        },
        defaultValue: {
          summary: 'fill',
        },
      },
    },
    size: {
      name: 'size',
      description: '按钮大小',
      defaultValue: 'md',
      options: ['md', 'sm', 'lg'],
      control: {
        type: 'select',
        labels: { md: '默认', sm: '小', lg: '大' },
      },

      table: {
        type: {
          summary: 'enum',
          detail: `
            md: 默认, sm: 小, lg: 大
          `,
        },
        defaultValue: {
          summary: 'md',
        },
      },
    },
    round: {
      name: 'round',
      description: '是否圆角',
      defaultValue: false,
      control: { type: 'boolean' },
      table: {
        type: {
          summary: 'boolean',
        },
        defaultValue: {
          summary: false,
        },
      },
    },
    src: {
      name: 'src',
      description: 'svg 素材',
      control: { type: 'string' },
      table: {
        type: {
          summary: 'string',
        },
      },
    },
  },

  // 组件文档
  parameters: {
    docs: {
      // 组件整体描述
      description: {
        component: '按钮',
      },
      // 代码示例
      source: {
        type: 'code',
        code: `<Icon src={star} />`,
      },
    },
  },
};

const Template = (args) => <Icon {...args} />;

export const IconStory = Template.bind({});

IconStory.args = {
  src: star,
};
