import React from 'react';
import { DatePicker } from '../src';

export default {
  title: 'Components/Form/DatePicker',
  component: DatePicker,
};

export const DatePickerStory = () => {
  const onChange = (date: any) => {};

  return (
    <div style={{ width: 200 }}>
      日：
      <DatePicker />
      月：
      <DatePicker picker="month" />
      年：
      <DatePicker picker="year" />
      区间：
      <DatePicker selectsRange />
    </div>
  );
};
