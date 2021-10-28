import React, { useCallback, useEffect, useState, FC } from 'react';
import moment, { Moment } from 'moment';

import { Calendar, BasicDayFormat } from './Calendar';

export interface DateRangePickerProps {
  value?: [Moment, Moment];
  onChange?: ([start, end]: [Moment, Moment]) => void;
}

export const DateRangePicker: FC<DateRangePickerProps> = ({
  value,
  onChange,
}) => {
  const [month, setMonth] = useState<Moment>();
  const [startDay, setStartDay] = useState<Moment>();
  const [endDay, setEndDay] = useState<Moment>();
  const [hoveringDay, setHoveringDay] = useState<Moment>();

  useEffect(() => {
    if (Array.isArray(value) && value?.length === 2) {
      setStartDay(value[0]);
      setEndDay(value[1]);

      setMonth(moment(value[0]).startOf('month'));
    }
  }, [value]);

  const selectDay = useCallback(
    (mnt) => {
      if (startDay && !endDay) {
        const [prev, next] = mnt.isBefore(startDay)
          ? [mnt, startDay]
          : [startDay, mnt];

        setStartDay(prev);
        setEndDay(next);

        if (prev && next && onChange) {
          onChange([prev, next]);
        }
      } else {
        setStartDay(mnt);
        setEndDay(undefined);
      }
    },
    [startDay, endDay],
  );

  const format = useCallback(
    (days) => {
      return days.map((day: BasicDayFormat) => {
        const { mnt, month } = day;

        const inMonth = mnt.isSame(month, 'month');

        let hover = hoveringDay && mnt.isSame(hoveringDay, 'day');

        let isStart = startDay && mnt.isSame(startDay, 'day');
        let isEnd = endDay && mnt.isSame(endDay, 'day');

        let isBetween = false,
          active = Boolean(isStart || isEnd);

        if (startDay && endDay) {
          isBetween = mnt.isBetween(startDay, endDay);
        } else if (startDay && hoveringDay) {
          const [prev, next] = hoveringDay.isBefore(startDay)
            ? [hoveringDay, startDay]
            : [startDay, hoveringDay];

          isBetween = mnt.isBetween(prev, next);

          isStart = prev && mnt.isSame(prev, 'day');
          isEnd = next && mnt.isSame(next, 'day');
        }

        const style = {
          width: '100%',
          height: 24,
          marginBottom: 4,
          transition: 'all .25s ease',
          borderTopLeftRadius: isStart ? 12 : 0,
          borderBottomLeftRadius: isStart ? 12 : 0,

          borderTopRightRadius: isEnd ? 12 : 0,
          borderBottomRightRadius: isEnd ? 12 : 0,

          textAlign: 'center',
          cursor: 'pointer',

          color:
            active || isBetween || hover ? '#fff' : inMonth ? '#444' : '#bbb',
          background: active
            ? '#459'
            : isBetween
            ? endDay
              ? '#459'
              : '#5657aa44'
            : hover
            ? '#5657aa44'
            : 'transparent',
        };

        return Object.assign({}, day, {
          style,
          onClick: () => selectDay(mnt),
          onMouseEnter: () => setHoveringDay(mnt),
        });
      });
    },
    [startDay, endDay, hoveringDay, selectDay],
  );

  return (
    <Calendar
      format={format}
      month={month}
      onMouseLeaveContainer={() => setHoveringDay(undefined)}
    />
  );
};
