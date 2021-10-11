import React from 'react';
import { Tabs, ITabsProps } from '../index';

export default {
  title: 'Components/base/Tabs',
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
        source: {
          type: 'code',
          code: '',
        },
      },
    },
  },
};

export const TabsStory = (args: ITabsProps) => {
  return (
    <Tabs
      // defaultActiveKey="1"
      // onChange={(key) => console.log(key)}
      style={{ height: 274 }}
      // style={{ width: 200 }}
      // centered
      // tabPosition="left"
      {...args}
    >
      <Tabs.TabPane tab="Tab 1" key="1">
        Content of Tab Pane 1
      </Tabs.TabPane>
      <Tabs.TabPane tab="Tab 2" key="2" disabled>
        Content of Tab Pane 2
      </Tabs.TabPane>
      <Tabs.TabPane tab="Tab 3" key="3">
        Content of Tab Pane 3
      </Tabs.TabPane>
      <Tabs.TabPane tab="Tab 4" key="4">
        Content of Tab Pane 4
      </Tabs.TabPane>
      <Tabs.TabPane tab="Tab 5" key="5">
        Content of Tab Pane 5
      </Tabs.TabPane>
      <Tabs.TabPane tab="Tab 6" key="6">
        Content of Tab Pane 6
      </Tabs.TabPane>
      <Tabs.TabPane tab="Tab 7" key="7">
        Content of Tab Pane 7
      </Tabs.TabPane>
      <Tabs.TabPane tab="Tab 8" key="8">
        Content of Tab Pane 8
      </Tabs.TabPane>
    </Tabs>
  );
};
