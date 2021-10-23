import React, { useMemo, useState } from 'react';

import { Button } from '@elonwu/web-button';
import { Card } from '@elonwu/web-card';
import { Text } from '@elonwu/web-text';

import { Loading } from '../src';

export default {
  title: 'Components/Base/Loading',
  component: Loading,
};

export const LoadingStory = () => {
  const [loading1, setLoading1] = useState(true);
  const [loading2, setLoading2] = useState(false);

  return (
    <div
      style={{
        padding: 16,
        border: '1px solid #ededed',
        margin: '120px auto',
      }}
    >
      <div
        style={{
          display: 'grid',
          gap: 16,
          // gridTemplateColumns: 'repeat(2, 1fr)',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridAutoFlow: 'column',
            gap: 12,
            placeContent: 'stretch',
            placeItems: 'center',
          }}
        >
          <Loading style={{ borderRadius: 8 }} loading={loading2} desc={null}>
            <div style={{ padding: 12 }}>
              <Text>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Et,
                velit atque non expedita excepturi officiis numquam illo
                deleniti dignissimos quas sequi laborum eum labore quia.
                Temporibus neque ratione esse sapiente.
              </Text>
            </div>
          </Loading>
          <Button onClick={() => setLoading2((prev) => !prev)}>
            {loading2 ? '关闭' : '打开'}
          </Button>
        </div>
        <div
          style={{
            display: 'grid',
            gridAutoFlow: 'column',
            gap: 12,
            placeContent: 'stretch',
            placeItems: 'center',
          }}
        >
          <Loading style={{ borderRadius: 8 }} loading={loading1} desc="加载中">
            <Card>
              <Text>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Et,
                velit atque non expedita excepturi officiis numquam illo
                deleniti dignissimos quas sequi laborum eum labore quia.
                Temporibus neque ratione esse sapiente.
              </Text>
            </Card>
          </Loading>
          <Button onClick={() => setLoading1((prev) => !prev)}>
            {loading1 ? '关闭' : '打开'}
          </Button>
        </div>
      </div>
    </div>
  );
};
