import React from 'react';
import { Tabs, ITabsProps } from '../index';

export default {
  title: 'Components/Base/Tabs',
  component: Tabs,
  argTypes: {
    defaultActiveKey: {
      name: 'defaultActiveKey',
      description: '初始化选中面板的 key',
      defaultValue: '',
      table: {
        type: {
          summary: 'string',
        },
        defaultValue: {
          summary: '第一项',
        },
      },
      control: { type: 'text' },
    },
    centered: {
      name: 'centered',
      description: '标签居中展示，tabPosition="top"时候有效',
      defaultValue: false,
      table: {
        type: {
          summary: 'boolean',
        },
        defaultValue: {
          summary: false,
        },
      },
      control: { type: 'boolean' },
    },
    tabPosition: {
      name: 'tabPosition',
      description: '页签位置，可选值有 top left',
      defaultValue: 'top',
      table: {
        type: {
          summary: 'text',
        },
        defaultValue: {
          summary: 'top',
        },
      },
      options: ['top', 'left'],
      control: {
        type: 'select',
        labels: { top: 'top', left: 'left' },
      },
    },
    onChange: {
      name: 'onChange',
      description: '切换面板的回调',
      table: {
        type: {
          summary: 'function(key)',
        },
      },
    },
  },
  parameters: {
    docs: {
      description: {
        component: '选项卡切换组件。',
      },
      source: {
        type: 'code',
        code: ``,
      },
    },
  },
};

export const TabsStory = (args: ITabsProps) => {
  const data = () => {
    const d = [];
    for (let i = 1; i < 10; i++) {
      const j = {
        tab: 'Tab ' + i,
        key: i.toString(),
        component: 'Content of Tab Pane' + i,
      };
      d.push(j);
    }
    return d;
  };

  return (
    <Tabs
      {...args}
      defaultActiveKey="2"
      onChange={(key) => console.log(key)}
      // style={{ width: 200 }}
      // centered
      // tabPosition="left"
    >
      {data()?.map((item) => (
        <Tabs.TabPane tab={item.tab} key={item.key}>
          {item.component}
        </Tabs.TabPane>
      ))}
    </Tabs>
  );
};
