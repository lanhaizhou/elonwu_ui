import React from 'react';
import { Select } from '../src';

export default {
  title: 'Components/base/select',
  component: Select,
};

export const SelectStory = () => {
  const data = [
    {
      label: 'lucy',
      value: 'lucy',
    },
    {
      label: 'disabled',
      value: 'disabled',
      disabled: true,
    },
    {
      label: 'jack',
      value: 'jack',
    },
    {
      label: 'dav',
      value: 'dav',
    },
  ];

  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ];
  return (
    <div>
      <Select
        options={data}
        defaultValue={'lucy'}
        onChange={(value, option) => {
          console.log('value-', value);
          console.log('option-', option);
        }}
      />
      <Select
        options={data}
        defaultValue={['jack']}
        multiple
        onChange={(value, option) => {
          console.log('value-', value);
          console.log('option-', option);
        }}
      />
      <Select
        options={options}
        onChange={(value, option) => {
          console.log('value-', value);
          console.log('option-', option);
        }}
        isNew
        style={{ width: 300 }}
      />
      <div style={{ height: 10, width: 10 }}></div>
      <Select
        options={options}
        onChange={(value, option) => {
          console.log('value-', value);
          console.log('option-', option);
        }}
        isNew
        multiple
        style={{ width: 300 }}
      />
    </div>
  );
};
