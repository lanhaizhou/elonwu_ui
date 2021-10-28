import React, { useState } from 'react';
import { TextArea } from '../src';

export default {
  title: 'Components/Form/TextArea',
  component: TextArea,
};

export const TextAreaStory = () => {
  const [value, setValue] = useState();
  const onChange = (e: any) => {
    const currentValue = e.target.value;
    setValue(currentValue);
  };

  return (
    <TextArea
      style={{ width: 150, height: 50 }}
      value={value}
      onChange={onChange}
    />
  );
};
