import React, { useState } from 'react';

import { Pie } from '..';

export default {
  title: 'Components/Chart/Pie',
  component: Pie,
};

export const PieStory = () => (
  <Pie
    chartKey="Story-Pie"
    dataSource={[
      { x: '2020-07-25', y: 100 },
      { x: '2020-07-26', y: 120 },
      { x: '2020-07-27', y: 70 },
      { x: '2020-07-28', y: 140 },
      { x: '2020-07-29', y: 110 },
      { x: '2020-07-30', y: 30 },
      { x: '2020-07-31', y: 60 },
    ]}
    height={420}
  />
);

export const MobilePieStory = () => (
  <div>
    <Pie
      chartKey="Story-MobilePie"
      dataSource={[
        { x: '2020-07-25', y: 100 },
        { x: '2020-07-26', y: 120 },
        { x: '2020-07-27', y: 70 },
        { x: '2020-07-28', y: 140 },
        { x: '2020-07-29', y: 110 },
        { x: '2020-07-30', y: 30 },
        { x: '2020-07-31', y: 60 },
      ]}
      height={240}
      setConfig={({ chart }) => {
        chart.legend(false);
      }}
    />
  </div>
);
