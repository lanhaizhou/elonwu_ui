import React from 'react';
import { Tabs } from '../index';

export default {
  title: 'Components/base/Tabs',
  component: Tabs,
};

export const TabsStory = (args: any) => {
  return (
    <Tabs
      defaultActiveKey="1"
      onChange={(key) => console.log(key)}
      style={{ width: 200 }}
    >
      <Tabs.TabPane tab="Tab 1" key="1">
        Content of Tab Pane 1
      </Tabs.TabPane>
      <Tabs.TabPane tab="Tab 2" key="2">
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
