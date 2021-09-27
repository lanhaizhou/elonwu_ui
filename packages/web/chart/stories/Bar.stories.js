import React, { useMemo } from 'react';

import { Bar, Chart } from '../src';
import { Card } from '@elonwu/web-card';
import { useApi } from '@elonwu/hooks';

export default {
  title: 'Components/Chart/Bar',
  component: Bar,
};

const fetchBar = () => {
  return new Promise((resolve) => {
    setTimeout(
      () =>
        resolve([
          { x: '2020-07-25', y: 100 },
          { x: '2020-07-26', y: 120 },
          { x: '2020-07-27', y: 70 },
          { x: '2020-07-28', y: 140 },
          { x: '2020-07-29', y: 110 },
          { x: '2020-07-30', y: 30 },
          { x: '2020-07-31', y: 60 },
        ]),
      2000,
    );
  });
};

export const BarStory = () => {
  const { data = [], loading } = useApi(fetchBar);

  // 可做二次处理
  const dataSource = useMemo(() => data, [data]);

  return (
    <Bar chartKey="Story-BarChart" dataSource={dataSource} loading={loading} />
  );
};

export const MobileBarStory = () => (
  <Card style={{ width: 275, margin: 'auto' }}>
    <Chart
      chartKey="Story-MobileBar"
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
      setConfig={({ chart, source }) => {
        chart.clear();

        // 条形图， 自动筛选前十、倒序
        const sortedData = source
          .sort((prev, next) => next.y - prev.y)
          .slice(0, 10)
          .reverse();

        chart.data(sortedData);

        chart.scale('y', { nice: true });
        chart.coordinate().transpose();

        chart
          .interval()
          .position('x*y')
          .style({ radius: [8, 8, 8, 8] });

        chart.axis(false);
      }}
    />
  </Card>
);
