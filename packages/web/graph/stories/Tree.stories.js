import React from 'react';

import { Tree } from '../src';

export default {
  title: 'Components/Graph/Tree',
  component: Tree,
};

export const TreeStory = () => (
  <div style={{ display: 'grid', placeContent: 'center' }}>
    <Tree
      chartKey="TreeStory"
      dataSource={{
        id: 'BBGAME',
        children: [
          {
            id: '战略支撑平台',
            children: [
              {
                id: '技术部',
              },
              {
                id: '运维部',
              },
              {
                id: '人力资源中心',
              },
            ],
          },
          {
            id: '研发平台',
            children: [
              {
                id: '研发一部',
                children: [
                  {
                    id: '一部开发',
                  },
                  {
                    id: '一部策划',
                  },
                  {
                    id: '一部美术',
                  },
                ],
              },
              {
                id: '研发二部',
                children: [
                  {
                    id: '二部开发',
                  },
                  {
                    id: '二部策划',
                  },
                  {
                    id: '二部美术',
                  },
                ],
              },
            ],
          },
          {
            id: '发行平台',
            children: [
              {
                id: '市场部',
              },
              {
                id: '设计部',
              },
              {
                id: '日本',
              },
              {
                id: '韩国',
              },
              {
                id: '欧美',
              },
            ],
          },
        ],
      }}
      width={600}
      height={400}
    />
  </div>
);
