import React from 'react';
import { InputNumber } from '../src';

export default {
  title: 'Components/Form/InputNumber',
  component: InputNumber,
};

export const InputNumberStory = () => {
  const onChange = (value: any) => {
    console.log(value);
  };

  return (
    <div style={{ width: 150 }}>
      <InputNumber defaultValue={10} onChange={onChange} />
    </div>
  );
};
