import React from 'react';

import { Line, Chart } from '..';

export default {
  title: 'Components/Chart/Line',
  component: Line,
};

export const LineStory = () => (
  <Line
    chartKey="Story-Line"
    dataSource={[
      { x: '2020-07-25', y: 100 },
      { x: '2020-07-26', y: 120 },
      { x: '2020-07-27', y: 70 },
      { x: '2020-07-28', y: 140 },
      { x: '2020-07-29', y: 110 },
      { x: '2020-07-30', y: 30 },
      { x: '2020-07-31', y: 60 },
    ]}
  />
);

export const MobileLineStory = () => (
  <div>
    <Line
      height={240}
      chartKey="Story-MobileLine"
      dataSource={[
        { x: '2020-07-25', y: 100 },
        { x: '2020-07-26', y: 120 },
        { x: '2020-07-27', y: 70 },
        { x: '2020-07-28', y: 140 },
        { x: '2020-07-29', y: 110 },
        { x: '2020-07-30', y: 30 },
        { x: '2020-07-31', y: 60 },
      ]}
      setConfig={({ chart, source }) => {
        chart.legend({ position: 'top' });
        chart.axis(false);
      }}
    />
  </div>
);
