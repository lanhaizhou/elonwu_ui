import React, { useCallback, useMemo, useRef, useState } from 'react';

import { Text, Title, Card, Button } from '@elonwu/web';
import { formatRound } from '@elonwu/utils';
import { useIntersection } from '../src';

export default {
  title: 'Hooks/useIntersection',
};

export const UseIntersectionStory = () => {
  const list = useMemo(() => new Array(20).fill(1).map((_, i) => i), []);

  const rootRef = useRef();
  const targetRef = useRef();

  const { visible, ratio, scrollIntoView } = useIntersection({
    rootRef, //未指定时默认为 ducument
    targetRef,
    options: {
      step: 0.05,
      margin: 16,
    },
  });

  console.log({ ratio });

  return (
    <div>
      <Title>
        {visible ? '视野内' : '视野外'}; 可见比例 {formatRound(ratio * 100, 0)}%
      </Title>

      <Button
        onClick={() =>
          scrollIntoView({
            behavior: 'smooth',
            block: 'center',
            inline: 'center',
          })
        }
      >
        滚动至可见
      </Button>
      <div
        ref={rootRef}
        style={{
          width: 400,
          height: 400,
          overflow: 'auto',
          padding: 16,
          border: '1px solid #ededed',
        }}
      >
        {list.map((key) => (
          <Text key={`prev-${key}`}>{key}</Text>
        ))}

        <Card
          ref={targetRef}
          style={{ height: 200, width: 200, background: '#f3f4f5' }}
        />

        {list.map((key) => (
          <Text key={`next-${key}`}>{key}</Text>
        ))}
      </div>
    </div>
  );
};
