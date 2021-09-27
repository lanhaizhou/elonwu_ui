import React from 'react';

import { BarStack, Chart } from '../src';
import { Card } from '@elonwu/web-card';

export default {
  title: 'Components/Chart/BarStack',
  component: BarStack,
};

export const BarStackStory = () => (
  <BarStack
    chartKey="Story-BarStack"
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
  />
);

export const MobileBarStackStory = () => (
  <Card style={{ width: 275, margin: 'auto' }}>
    <BarStack
      height={240}
      chartKey="Story-MobileBarStack"
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
      setConfig={({ chart, source }) => {
        chart.legend({ position: 'top' });
        chart.axis(false);
      }}
    />
  </Card>
);
