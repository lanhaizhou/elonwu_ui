import React from 'react';
import { Calendar, DatePicker, DateRangePicker } from '../src';

export default {
  title: 'Components/Date',
};

export const CalendarStory = () => <Calendar />;

export const DatePickerStory = () => (
  <DatePicker onChange={(value) => console.log(value.format())} />
);

export const DateRangePickerStory = () => (
  <DateRangePicker
    onChange={(value) => value.forEach((val) => console.log(val.format()))}
  />
);
