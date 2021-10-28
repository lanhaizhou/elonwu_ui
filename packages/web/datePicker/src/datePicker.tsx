import React, { FC, useEffect, useState } from 'react';
import ReactDatePickerX from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface IReactDatePickerProps {
  selectsRange?: boolean;
  showMonthYearPicker?: boolean;
  showYearPicker?: boolean;
  startDate?: string | null;
  endDate?: string | null;
  onChange?: (data: any) => void;
  isClearable?: boolean;
  selected?: string | null | string[] | null[];
  dateFormat?: string;
  picker?: 'month' | 'year';
}

const ReactDatePicker: FC<IReactDatePickerProps> = ReactDatePickerX as any;

export const DatePicker: FC<IReactDatePickerProps> = (props) => {
  const {
    dateFormat = 'yyyy-MM-dd',
    selectsRange = false,
    onChange: propsOnchange,
    picker,
  } = props;
  const [dateRange, setDateRange] = useState([null, null]);
  const [date, setDate] = useState(null);
  const [startDate, endDate] = dateRange;
  const [format, setFormat] = useState(dateFormat);
  const [showMonthYearPicker, setShowMonthYearPicker] = useState(false);
  const [showYearPicker, setShowYearPicker] = useState(false);

  const onChange = (update: any) => {
    selectsRange ? setDateRange(update) : setDate(update);
    if (showMonthYearPicker) update = new Date(update).getMonth() + 1;
    if (showYearPicker) update = new Date(update).getFullYear();
    propsOnchange && propsOnchange(update);
  };

  useEffect(() => {
    const pickers = {
      month: 'MM',
      year: 'yyyy',
    };
    setFormat(picker && pickers[picker] ? pickers[picker] : dateFormat);
    if (picker === 'month') setShowMonthYearPicker(true);
    if (picker === 'year') setShowYearPicker(true);
  }, [picker]);

  return (
    <ReactDatePicker
      isClearable={true}
      dateFormat={format}
      {...props}
      showMonthYearPicker={showMonthYearPicker}
      showYearPicker={showYearPicker}
      selected={selectsRange ? '' : date}
      startDate={startDate}
      endDate={endDate}
      onChange={onChange}
    />
  );
};
