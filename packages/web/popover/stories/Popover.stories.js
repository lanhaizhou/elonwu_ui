import React, { useState, useMemo } from 'react';

import { Popover } from '../src';

import { Button } from '@elonwu/web-button';

export default {
  title: 'Components/Base/Popover',
  component: Popover,
};

export const PopoverStroy = () => {
  const [positionIndex, setPositionIndex] = useState(3);

  const position = useMemo(
    () =>
      [
        'top',
        'topLeft',
        'topRight',

        'bottom',
        'bottomLeft',
        'bottomRight',

        'left',
        'leftTop',
        'leftBottom',

        'right',
        'rightTop',
        'rightBottom',
      ][positionIndex] || 'bottom'[positionIndex],
  );

  return (
    <div
      style={{
        display: 'grid',
        placeContent: 'center',
        width: '100vw',
        height: '100vh',
        padding: 16,
      }}
    >
      <div>
        <div>
          内联的
          <Popover
            position="rightBottom"
            trigger={
              <Button
                onClick={() => setPositionIndex((prev) => (prev + 1) % 12)}
              >
                menu trigger
              </Button>
            }
            style={{ margin: 8 }}
          >
            <List />
          </Popover>
          内联的
        </div>
      </div>
    </div>
  );
};

const List = () => {
  const list = useMemo(() => {
    return [1, 2, 3, 4];
  }, []);

  return (
    <ul style={{ listStyle: 'none' }}>
      {list.map((li) => (
        <li key={li}>
          <Popover
            // position="rightBottom"
            position="right"
            trigger={
              <div
                style={{
                  width: 120,
                  padding: 12,
                }}
              >
                item {li}
              </div>
            }
          >
            <ul style={{ listStyle: 'none' }}>
              {list.map((j) => (
                <li
                  key={j}
                  style={{
                    width: 120,
                    padding: 12,
                  }}
                >
                  nested-{li}-{j}
                </li>
              ))}
            </ul>
          </Popover>
        </li>
      ))}
    </ul>
  );
};
