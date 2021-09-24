import React from 'react';

import { BarGroup, Chart } from '..';
import { Card } from '@elonwu/web-card';

export default {
  title: 'Components/Chart/BarGroup',
  component: BarGroup,
};

export const BarGroupStory = () => (
  <BarGroup
    chartKey="Story-BarGroup"
    dataSource={[
      { x: '2020-07-25', y: 100, z: '类型1' },
      { x: '2020-07-26', y: 120, z: '类型1' },
      { x: '2020-07-27', y: 70, z: '类型1' },
      { x: '2020-07-28', y: 140, z: '类型1' },
      { x: '2020-07-29', y: 110, z: '类型1' },
      { x: '2020-07-30', y: 30, z: '类型1' },
      { x: '2020-07-31', y: 60, z: '类型1' },

      { x: '2020-07-25', y: 180, z: '类型2' },
      { x: '2020-07-26', y: 20, z: '类型2' },
      { x: '2020-07-27', y: 60, z: '类型2' },
      { x: '2020-07-28', y: 120, z: '类型2' },
      { x: '2020-07-29', y: 60, z: '类型2' },
      { x: '2020-07-30', y: 30, z: '类型2' },
      { x: '2020-07-31', y: 40, z: '类型2' },
    ]}
    height={500}
  />
);

export const MobileBarGroupStory = () => (
  <Card style={{ width: 275, margin: 'auto' }}>
    <Chart
      height={240}
      chartKey="Story-MobileBarGroup"
      dataSource={[
        { x: '2020-07-25', y: 100, z: '类型1' },
        { x: '2020-07-26', y: 120, z: '类型1' },
        { x: '2020-07-27', y: 70, z: '类型1' },
        { x: '2020-07-28', y: 140, z: '类型1' },
        { x: '2020-07-29', y: 110, z: '类型1' },
        { x: '2020-07-30', y: 30, z: '类型1' },
        { x: '2020-07-31', y: 60, z: '类型1' },

        { x: '2020-07-25', y: 180, z: '类型2' },
        { x: '2020-07-26', y: 20, z: '类型2' },
        { x: '2020-07-27', y: 60, z: '类型2' },
        { x: '2020-07-28', y: 120, z: '类型2' },
        { x: '2020-07-29', y: 60, z: '类型2' },
        { x: '2020-07-30', y: 30, z: '类型2' },
        { x: '2020-07-31', y: 40, z: '类型2' },
      ]}
      configChart={({ chart, source }) => {
        chart.data(source);

        chart.scale('y', { nice: true });
        chart.coordinate().transpose();

        chart
          .interval()
          .position('x*y')
          .color('z')
          .adjust([
            {
              type: 'dodge',
              marginRatio: 0.2,
            },
          ])
          .style({ radius: [8, 8, 8, 8] });

        chart.legend({ position: 'top' });
        chart.axis(false);
      }}
    />
  </Card>
);
