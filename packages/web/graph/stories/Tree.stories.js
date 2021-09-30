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
            id: 'Boos1',
            children: [
              {
                id: 'MG1',
                children: [{ id: 'MG10' }, { id: 'MG11' }],
              },
              {
                id: 'MG2',
                children: [{ id: 'MG12' }, { id: 'MG13' }],
              },
              { id: 'MG5' },
              { id: 'MG6' },
              {
                id: 'MG3',
                children: [{ id: 'MG15' }, { id: 'MG16' }],
              },
            ],
          },
          {
            id: 'Boos2',
            children: [
              { id: 'MG7', children: [{ id: 'MG20' }] },
              {
                id: 'MG4',
                children: [{ id: 'MG17' }, { id: 'MG18' }, { id: 'MG19' }],
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
