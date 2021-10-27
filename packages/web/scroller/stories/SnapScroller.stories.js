import React, { useCallback, useMemo, useState } from 'react';

import { Card } from '@elonwu/web-card';
import { Title } from '@elonwu/web-text';

import { SnapScroller } from '../src';

export default {
  title: 'Components/Compose/SnapScroller',
  component: SnapScroller,
};

export const HorizontalSnapScrollerStory = () => {
  const items = useMemo(() => {
    return [
      { key: 'item1', title: 'item1' },
      { key: 'item2', title: 'item2' },
      { key: 'item3', title: 'item3' },
      { key: 'item4', title: 'item4' },
      { key: 'item5', title: 'item5' },
      { key: 'item6', title: 'item6' },
      { key: 'item7', title: 'item7' },
      { key: 'item8', title: 'item8' },
      { key: 'item9', title: 'item9' },
      { key: 'item10', title: 'item10' },
    ];
  }, []);

  return (
    <SnapScroller
      onScrollChange={console.log}
      style={{
        width: 480,
        margin: '100px auto',
        borderRadius: 12,
        boxShadow: 'rgb(175 175 175 / 40%) 1px 1px 8px 0px',
      }}
    >
      {items.map((item, i, items) => {
        return (
          <SnapScroller.Item key={item.key} i={i}>
            <Item item={item} i={i} items={items} />
          </SnapScroller.Item>
        );
      })}
    </SnapScroller>
  );
};

const Item = ({ item, i, items, ...rest }) => {
  return (
    <div style={{ padding: 4, width: 480 }}>
      <Card
        style={{
          height: 180,
          background: '#eee',
          display: 'grid',
          placeContent: 'center',
          cursor: 'pointer',
        }}
        {...rest}
      >
        <Title>{item?.title}</Title>
      </Card>
    </div>
  );
};

export const FullSnapScrollerStory = () => {
  const items = useMemo(() => {
    return [
      { key: 'item1', title: 'item1' },
      { key: 'item2', title: 'item2' },
      { key: 'item3', title: 'item3' },
      { key: 'item4', title: 'item4' },
      { key: 'item5', title: 'item5' },
    ];
  }, []);

  return (
    <SnapScroller
      direction="vertical"
      style={{
        width: 'calc(100vw - 2rem)',
        height: 'calc(100vh - 2rem)',
      }}
    >
      {items.map((item, i, items) => {
        return (
          <SnapScroller.Item key={item.key} i={i}>
            <FullItem item={item} i={i} items={items} />
          </SnapScroller.Item>
        );
      })}
    </SnapScroller>
  );
};

const FullItem = ({ item, i, items, ...rest }) => {
  return (
    <Card
      style={{
        width: '100%',
        height: 'calc(100vh - 2rem)',
        background: i % 2 ? '#444' : '#ccc',
        display: 'grid',
        placeContent: 'center',
        cursor: 'pointer',
      }}
      {...rest}
    >
      <Title
        style={{
          color: i % 2 ? '#ccc' : '#444',
        }}
      >
        {item?.title}
      </Title>
    </Card>
  );
};
