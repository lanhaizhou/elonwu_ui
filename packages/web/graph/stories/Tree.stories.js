import React, { useState } from 'react';

import { Tree } from '../src';

import avatar from './assets/avatar.jpeg';

export default {
  title: 'Components/Graph/Tree',
  component: Tree,
};

export const TreeStory = () => {
  const [active, setActive] = useState();

  const onNodeClick = (e) => {
    setActive(e.item._cfg.id);
  };

  return (
    <div style={{ display: 'grid', placeContent: 'center' }}>
      <Tree
        chartKey="TreeStory"
        events={{
          'node:click': onNodeClick,
        }}
        activeNodes={[active]}
        dataSource={{
          label: 'BBGAME',
          id: 'id-BBGAME',
          img: avatar,
          logoIcon: avatar,
          icon: avatar,

          children: [
            {
              label: 'Boos1',
              id: 'id-Boos1',
              children: [
                {
                  label: 'MG1',
                  id: 'id-MG1',
                  children: [
                    { label: 'MG10', id: 'id-MG10' },
                    { label: 'MG11', id: 'id-MG11' },
                  ],
                },
                {
                  label: 'MG2',
                  id: 'id-MG2',
                  children: [
                    { label: 'MG12', id: 'id-MG12' },
                    { label: 'MG13', id: 'id-MG13' },
                  ],
                },
                { label: 'MG5', id: 'id-MG5' },
                { label: 'MG6', id: 'id-MG6' },
                {
                  label: 'MG3',
                  id: 'id-MG3',
                  children: [
                    { label: 'MG15', id: 'id-MG15' },
                    { label: 'MG16', id: 'id-MG16' },
                  ],
                },
              ],
            },
            {
              label: 'Boos2',
              id: 'id-Boos2',
              children: [
                {
                  label: 'MG7',
                  id: 'id-MG7',
                  children: [{ label: 'MG20', id: 'id-MG20' }],
                },
                {
                  label: 'MG4',
                  id: 'id-MG4',
                  children: [
                    { label: 'MG17', id: 'id-MG17' },
                    { label: 'MG18', id: 'id-MG18' },
                    { label: 'MG19', id: 'id-MG19' },
                  ],
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
};
