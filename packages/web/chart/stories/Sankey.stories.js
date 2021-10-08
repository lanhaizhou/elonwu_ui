import React from 'react';
import { Sankey } from '../src';

export default {
  title: 'Components/Chart/Sankey',
  component: Sankey,
};

export const SankeyStory = () => (
  <Sankey
    chartKey="Story-SankeyChart"
    dataSource={{
      links: [
        { source: 0, target: 1, value: 76372520 },
        { source: 2, target: 0, value: 84466838 },
        { source: 1, target: 3, value: 16759520 },
        { source: 4, target: 0, value: 10316076 },
        { source: 1, target: 5, value: 55667000 },
        { source: 6, target: 0, value: 27336968 },
        { source: 1, target: 7, value: 3946000 },
      ],
      nodes: [
        { name: '产出' },
        { name: '消耗' },
        { name: '08-09 产出' },
        { name: '08-09 消耗' },
        { name: '08-10 产出' },
        { name: '08-10 消耗' },
        { name: '08-11 产出' },
        { name: '08-11 消耗' },
      ],
    }}
    height={500}
  />
);
