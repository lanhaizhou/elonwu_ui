import React, { useState } from 'react';

import { AreaStack } from '../src';
import { Card } from '@elonwu/web-card';

export default {
  title: 'Components/Chart/AreaStack',
  component: AreaStack,
};

export const AreaStackStory = () => (
  <AreaStack
    chartKey="Story-AreaStack"
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
    height={450}
  />
);

export const MobileAreaStackStory = () => (
  <Card style={{ width: 275, margin: 'auto' }}>
    <AreaStack
      chartKey="Story-MobileAreaStack"
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
      height={240}
      setConfig={({ chart }) => {
        chart.axis(false);
        chart.legend(false);
      }}
    />
  </Card>
);
