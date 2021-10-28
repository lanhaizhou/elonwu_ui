import React, { useCallback, useEffect, useState, FC } from 'react';
import moment, { Moment } from 'moment';

import { Calendar, BasicDayFormat } from './Calendar';

export interface DatePickerProps {
  value?: Moment;
  onChange?: (m: Moment) => void;
}

export const DatePicker: FC<DatePickerProps> = ({ value, onChange }) => {
  const [month, setMonth] = useState<Moment>();
  const [activeDay, selectDay] = useState<Moment>();
  const [hoveringDay, setHoveringDay] = useState<Moment>();

  useEffect(() => {
    if (value && activeDay && !value.isSame(activeDay)) {
      selectDay(moment(value));
      setMonth(moment(value).startOf('month'));
    }
  }, [value, activeDay]);

  const format = useCallback(
    (days) => {
      return days.map((day: BasicDayFormat) => {
        const { mnt, month } = day;

        const inMonth = mnt.isSame(month, 'month');

        const active = activeDay && mnt.isSame(activeDay, 'day');

        const hover = hoveringDay && mnt.isSame(hoveringDay, 'day');

        const style = {
          width: 24,
          height: 24,
          marginBottom: 4,
          transition: 'all .25s ease',
          borderRadius: '50%',
          textAlign: 'center',
          cursor: 'pointer',

          color: active || hover ? '#fff' : inMonth ? '#444' : '#bbb',
          background: active ? '#459' : hover ? '#5657aa44' : 'transparent',
        };

        return Object.assign({}, day, {
          style,
          onClick: () => {
            selectDay(mnt);
            onChange && onChange(mnt);
          },
          onMouseEnter: () => setHoveringDay(mnt),
        });
      });
    },
    [activeDay, onChange, hoveringDay],
  );

  return (
    <Calendar
      format={format}
      month={month}
      onMouseLeaveContainer={() => setHoveringDay(undefined)}
    />
  );
};
