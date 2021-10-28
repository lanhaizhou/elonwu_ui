import React, { useMemo, useState, EventHandler, FC } from 'react';

import moment, { Moment, MomentInput } from 'moment';

import { Card, Text, Title, Select } from '@elonwu/web';
import { isFunction } from '@elonwu/utils';

export interface BasicDayFormat {
  key: string;
  date: number;
  mnt: Moment;
  month: Moment;
}

export interface CalendarProps {
  format?: (days: BasicDayFormat[]) => void;
  month?: Moment;
  onMouseLeaveContainer?: EventHandler<any>;
}

export const Calendar: FC<CalendarProps> = ({
  format,
  month: activeMonth,
  onMouseLeaveContainer,
}) => {
  const [month, setMonth] = useState<Moment>(activeMonth || moment());

  const days: Moment[] = useMemo(() => {
    const firstDayOfMonth = moment(month).startOf('month');
    const lastDayOfMonth = moment(month).endOf('month');

    const firstDayOfFirstWeek = moment(firstDayOfMonth).startOf('week');
    const lastDayOfLastWeek = moment(lastDayOfMonth).endOf('week');

    let days = [];

    for (
      let m = moment(firstDayOfFirstWeek);
      m.isBefore(lastDayOfLastWeek);
      m.add(1, 'day')
    ) {
      days.push(moment(m));
    }
    return days;
  }, [month]);

  const formatDays = useMemo(() => {
    const basicFormatDays: BasicDayFormat[] = days.map((day) => ({
      key: day.format('YYYY-MM-DD'),
      date: day.date(),
      mnt: day,
      month,
    }));

    const formatDays =
      format && isFunction(format) ? format(basicFormatDays) : basicFormatDays;

    return formatDays;
  }, [days, month, format]);

  const monthOptions = useMemo(() => {
    return [
      { label: '2021-01', value: '2021-01' },
      { label: '2021-02', value: '2021-02' },
      { label: '2021-03', value: '2021-03' },
      { label: '2021-04', value: '2021-04' },
      { label: '2021-05', value: '2021-05' },
      { label: '2021-06', value: '2021-06' },
      { label: '2021-07', value: '2021-07' },
      { label: '2021-08', value: '2021-08' },
      { label: '2021-09', value: '2021-09' },
      { label: '2021-10', value: '2021-10' },
      { label: '2021-11', value: '2021-11' },
      { label: '2021-12', value: '2021-12' },
    ];
  }, []);

  const daysOfWeek = useMemo(
    () => ['一', '二', '三', '四', '五', '六', '日'],
    [],
  );

  return (
    <Card
      style={{
        display: 'grid',
        placeContent: 'stretch',
        gap: 12,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Title>Calendar</Title>

        <Select
          options={monthOptions}
          // TODO 待组件增加 value
          // @ts-ignore
          value={month.format('YYYY-MM')}
          onChange={(month) => setMonth(moment(month as MomentInput))}
          isNew
          style={{ width: 120 }}
        />
      </div>

      <div
        className="weekDays"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          placeItems: 'center',
        }}
      >
        {daysOfWeek.map((day) => (
          <Text key={day}>{day}</Text>
        ))}
      </div>
      <div
        className="days"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          placeItems: 'center',
        }}
        onMouseLeave={onMouseLeaveContainer}
      >
        {formatDays?.map(({ key, date, ...rest }) => (
          <Text key={key} className="day" {...rest}>
            {date}
          </Text>
        ))}
      </div>
    </Card>
  );
};
