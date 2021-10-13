import React from 'react';
import { Table } from '../src';
import { ITableProps } from '../src';

export default {
  title: 'Components/base/Table',
  component: Table,

  argTypes: {
    columns: {
      name: 'columns',
      description: '表格列的配置描述',
    },
    dataSource: {
      name: 'dataSource',
      description: '数据数组',
      defaultValue: [],
    },
    pagination: {
      name: 'pagination',
      description: '分页数据',
    },
    onChange: {
      name: 'onChange',
      description: '分页变化时触发',
    },
    autoPagination: {
      name: 'autoPagination',
      description: '是否自动分页',
    },
  },
  parameters: {
    docs: {
      description: {
        component: '展示行列数据。',
      },
      source: {
        type: 'code',
        code: '',
      },
    },
  },
};

export const TableStory = (args: ITableProps) => {
  const columns = [
    {
      title: 'Name',
      key: 'name',
      type: 'link',
    },
    {
      title: 'Age',
      key: 'age',
    },
    {
      title: 'character',
      key: 'character',
      type: 'tag',
    },
    {
      title: 'Address',
      key: 'address',
    },
    {
      title: 'Operations',
      key: 'operations',
      render: () => (
        <div style={{ color: '#1890ff', cursor: 'pointer' }}>Delete</div>
      ),
    },
  ];

  const newData = () => {
    const d = [];
    for (let i = 0; i < 165; i++) {
      const json = {
        name: 'Jack' + i,
        age: 28,
        address: 'some where New York No. 1 Lake Park',
        key: i,
        character: 'ambitious, brave, calm, compassionate, confident',
      };
      d.push(json);
    }

    return d;
  };

  return (
    <Table
      {...args}
      columns={columns}
      dataSource={newData()}
      autoPagination
      onChange={(current, pagesize) => console.log(current, pagesize)}
    />
  );
};
