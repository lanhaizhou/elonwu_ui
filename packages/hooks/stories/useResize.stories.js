import React, { useEffect, useRef } from 'react';

import { Card } from '@elonwu/web';
import { useResize } from '../src';

export default {
  title: 'Hooks/useResize',
};

export const UseResizeStory = () => {
  const targetRef = useRef();
  const rect = useResize(targetRef);

  useEffect(() => console.log({ rect }), [rect]);

  return (
    <div style={{ height: 200, overflow: 'auto', border: '1px solid #ededed' }}>
      <Card
        ref={targetRef}
        style={{
          width: '50vw',
          height: '50vh',
          background: '#f3f4f5',
        }}
      />
    </div>
  );
};
