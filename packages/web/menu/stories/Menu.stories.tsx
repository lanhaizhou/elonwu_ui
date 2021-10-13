import React from 'react';
import { Menu, IMenuCMPProps } from '../src';
import { Icon } from '@elonwu/web-icon';
import search from './assets/search.svg';
import reload from './assets/reload.svg';
import userPlus from './assets/user_plus.svg';

export default {
  title: 'Components/Base/Menu',
  component: Menu,

  argTypes: {
    defaultOpenKeys: {
      name: 'defaultOpenKeys',
      description: '初始展开的 SubMenu 菜单项 key 数组',
      defaultValue: [],
      table: {
        type: {
          summary: 'string[]',
        },
        defaultValue: {
          summary: [],
        },
      },
      control: { type: 'text' },
    },
    mode: {
      name: 'mode',
      description: '菜单类型，现在支持垂直、水平',
      defaultValue: 'vertical',
      table: {
        type: {
          summary: 'horizontal | vertical',
        },
        defaultValue: {
          summary: 'vertical',
        },
      },
      options: ['horizontal', 'vertical'],
      control: {
        type: 'select',
        labels: { horizontal: '水平', vertical: '垂直' },
      },
    },
    onSelect: {
      name: 'onSelect',
      description: '被选中时调用',
      table: {
        type: {
          summary: 'function(key)',
        },
      },
    },
  },

  parameters: {
    docs: {
      // 组件整体描述
      description: {
        component: '为页面和功能提供导航的菜单列表。',
      },
      // 代码示例
      source: {
        type: 'code',
        code: ``,
      },
    },
  },
};

export const MenuStory = (args: IMenuCMPProps) => {
  const data = [
    {
      name: '主页',
      key: '11',
    },
    {
      name: '游戏运营',
      icon: <Icon src={search} />,
      key: '22',
    },
    {
      name: '游戏管理',
      icon: <Icon src={reload} />,
      key: '33',
    },
    {
      name: '角色管理',
      disabled: true,
      key: '44',
    },
    {
      name: '游戏数据分析',
      icon: <Icon src={userPlus} />,
      key: 'sub1',
      subMenus: [
        {
          name: '新增分析',
          key: '55',
        },
        {
          name: '活跃分析',
          key: '66',
        },
        {
          name: '流失分析',
          key: 'sub2',
          subMenus: [
            {
              name: '流失用户',
              key: '77',
            },
            {
              name: '回流用户',
              key: '88',
            },
          ],
        },
      ],
      showSubMenus: true,
    },
  ];

  return (
    <Menu
      {...args}
      data={data}
      defaultSelectedKey={'66'}
      onSelect={(key) => console.log(key)}
    />
  );
};
