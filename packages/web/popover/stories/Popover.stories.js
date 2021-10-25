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
            position={position}
            trigger={
              <Button
                onClick={() => setPositionIndex((prev) => (prev + 1) % 12)}
              >
                trigger {position}
              </Button>
            }
            style={{ margin: 8 }}
          >
            <div
              style={{
                width: 280,
                height: 120,
                background: '#aaa',
                borderRadius: 8,
                display: 'grid',
                placeContent: 'center',
              }}
            >
              {position}
            </div>
          </Popover>
          内联的
        </div>
      </div>
    </div>
  );
};
