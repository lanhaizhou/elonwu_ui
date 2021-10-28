import React from 'react';
import { DatePicker } from '../src';

export default {
  title: 'Components/Form/DatePicker',
  component: DatePicker,
};

export const DatePickerStory = () => {
  const onChange = (date: any) => {
    console.log('date', date);
  };

  return (
    <div style={{ width: 200 }}>
      日：
      <DatePicker onChange={onChange} />
      月：
      <DatePicker picker="month" onChange={onChange} />
      年：
      <DatePicker picker="year" onChange={onChange} />
      区间：
      <DatePicker selectsRange onChange={onChange} />
    </div>
  );
};
