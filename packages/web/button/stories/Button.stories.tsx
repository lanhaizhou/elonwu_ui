import React from 'react';
import { Button } from '../src';

export default {
  title: 'Components/Base/Button',
  component: Button,

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
    block: {
      name: 'block',
      description: '宽度为父容器宽度',
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
    children: {
      name: 'children',
      description: '按钮文字，可使用其他 ReactElement',
      // type: 'string',
      defaultValue: 'Elon Button',
      control: { type: 'text' },
      type: { required: true },
      table: {
        type: {
          summary: 'string / ReactElement',
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
        code: `<Button>Elon Button</Button>`,
      },
    },
  },
};

export const ButtonStory = (args) => {
  return <Button {...args} />;
};
