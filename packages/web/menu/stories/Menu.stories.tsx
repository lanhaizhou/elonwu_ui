import React from 'react';
import { Menu, IMenuProps } from '../src';
import { Icon } from '@elonwu/web-icon';
import search from './assets/search.svg';
import reload from './assets/reload.svg';
import userPlus from './assets/user_plus.svg';

export default {
  title: 'Components/Base/Menu',
  component: (
    <Menu
      onSelect={function (selectedIndex: string): void {
        throw new Error('Function not implemented.');
      }}
    ></Menu>
  ),

  argTypes: {
    defaultIndex: {
      name: 'defaultIndex',
      description: '初始选中的菜单项 key',
      defaultValue: '0',
      table: {
        type: {
          summary: 'string',
        },
        defaultValue: {
          summary: '0',
        },
      },
      control: { type: 'text' },
    },
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
        code: `<Menu {...args}>
        <Menu.Item>主页</Menu.Item>
        <Menu.Item icon={<Icon src={search} />}>游戏运营</Menu.Item>
        <Menu.Item icon={<Icon src={reload} />}>游戏管理</Menu.Item>
        <Menu.Item disabled>角色管理</Menu.Item>
        <Menu.SubMenu title="游戏数据分析" icon={<Icon src={userPlus} />}>
          <Menu.Item>主页</Menu.Item>
          <Menu.Item>新增分析</Menu.Item>
          <Menu.Item>活跃分析</Menu.Item>
          <Menu.SubMenu title="流失分析">
            <Menu.Item>流失用户</Menu.Item>
            <Menu.Item>回流用户</Menu.Item>
          </Menu.SubMenu>
        </Menu.SubMenu>
        <Menu.SubMenu title="日志">
          <Menu.Item>货币</Menu.Item>
          <Menu.Item>背景</Menu.Item>
          <Menu.Item>行为</Menu.Item>
          <Menu.Item>角色</Menu.Item>
        </Menu.SubMenu>
      </Menu>`,
      },
    },
  },
};

export const MenuStory = (args: IMenuProps) => {
  return (
    <Menu {...args}>
      <Menu.Item>主页</Menu.Item>
      <Menu.Item icon={<Icon src={search} />}>游戏运营</Menu.Item>
      <Menu.Item icon={<Icon src={reload} />}>游戏管理</Menu.Item>
      <Menu.Item disabled>角色管理</Menu.Item>
      <Menu.SubMenu title="游戏数据分析" icon={<Icon src={userPlus} />}>
        <Menu.Item>主页</Menu.Item>
        <Menu.Item>新增分析</Menu.Item>
        <Menu.Item>活跃分析</Menu.Item>
        <Menu.SubMenu title="流失分析">
          <Menu.Item>流失用户</Menu.Item>
          <Menu.Item>回流用户</Menu.Item>
        </Menu.SubMenu>
      </Menu.SubMenu>
      <Menu.SubMenu title="日志">
        <Menu.Item>货币</Menu.Item>
        <Menu.Item>背景</Menu.Item>
        <Menu.Item>行为</Menu.Item>
        <Menu.Item>角色</Menu.Item>
      </Menu.SubMenu>
    </Menu>
  );
};
