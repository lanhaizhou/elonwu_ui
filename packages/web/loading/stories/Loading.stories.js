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
  const [loading2, setLoading2] = useState(true);
  const [loading3, setLoading3] = useState(true);

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
          gridTemplateColumns: 'repeat(2, 1fr)',
        }}
      >
        <div>
          <Button onClick={() => setLoading2((prev) => !prev)}>
            {loading2 ? '关闭' : '打开'}
          </Button>
          <Loading style={{ borderRadius: 8 }} loading={loading2} desc={null}>
            <Card>
              <Text>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Et,
                velit atque non expedita excepturi officiis numquam illo
                deleniti dignissimos quas sequi laborum eum labore quia.
                Temporibus neque ratione esse sapiente.
              </Text>
            </Card>
          </Loading>
        </div>
        <div>
          <Button onClick={() => setLoading3((prev) => !prev)}>
            {loading3 ? '关闭' : '打开'}
          </Button>
          <Loading style={{ borderRadius: 8 }} loading={loading3} desc="加载中">
            <Card>
              <Text>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Et,
                velit atque non expedita excepturi officiis numquam illo
                deleniti dignissimos quas sequi laborum eum labore quia.
                Temporibus neque ratione esse sapiente.
              </Text>
            </Card>
          </Loading>
        </div>
      </div>
    </div>
  );
};
