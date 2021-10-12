import React from 'react';
import { Table } from '../src';

export default {
  title: 'Components/base/Table',
  component: Table,
};

export const TableStory = () => {
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

  const data = [
    {
      name: 'Jack',
      age: 28,
      address: 'some where New York No. 1 Lake Park',
      key: '1',
      character: 'ambitious, brave, calm, compassionate, confident',
    },
    {
      name: 'Rose',
      age: 36,
      address: 'some where',
      key: '2',
      character: 'dynamic',
    },
  ];

  const newData = () => {
    const d = [];
    for (let i = 0; i < 175; i++) {
      const json = {
        name: 'Jack' + i,
        age: 28,
        address: 'some where New York No. 1 Lake Park',
        key: String(i),
        character: 'ambitious, brave, calm, compassionate, confident',
      };
      d.push(json);
    }

    return d;
  };

  return (
    <Table
      columns={columns}
      dataSource={newData()}
      autoPagination
      onChange={(current, pagesize) => console.log(current, pagesize)}
    />
  );
};
