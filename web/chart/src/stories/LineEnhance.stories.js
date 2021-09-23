import React from 'react';

import { LineEnhance, Chart } from '..';

export default {
  title: 'Components/Chart/LineEnhance',
  component: LineEnhance,
};

export const LineEnhanceStory = () => (
  <LineEnhance
    chartKey="Story-LineEnhanceChart"
    dataSource={[
      { x: '2020-07-25', y: 100 },
      { x: '2020-07-26', y: 120 },
      { x: '2020-07-27', y: 70 },
      { x: '2020-07-28', y: 140 },
      { x: '2020-07-29', y: 110 },
      { x: '2020-07-30', y: 30 },
      { x: '2020-07-31', y: 60 },
    ]}
    height={400}
  />
);

export const MobileLineStory = () => (
  <div>
    <LineEnhance
      height={240}
      chartKey="Story-MobileLineEnhance"
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
