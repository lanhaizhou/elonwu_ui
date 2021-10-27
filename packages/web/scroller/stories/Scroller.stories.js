import React, { useCallback, useMemo, useState } from 'react';

import { Card } from '@elonwu/web-card';
import { Title } from '@elonwu/web-text';

import { Scroller } from '../src';

export default {
  title: 'Components/Compose/Scroller',
  component: Scroller,
};

export const HorizontalScrollerStory = () => {
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

  const [active, setActive] = useState(3);

  return (
    <Scroller
      targetIndex={active}
      // onScrollChange={console.log}
      style={{
        // width: '100%',
        width: 480,
        margin: '100px auto',
        // padding: '12px 0 12px 12px',
        borderRadius: 12,
        boxShadow: 'rgb(175 175 175 / 40%) 1px 1px 8px 0px',
      }}
    >
      {items.map((item, i, items) => {
        return (
          <Scroller.Item key={item.key} i={i}>
            <Item
              item={item}
              i={i}
              items={items}
              onClick={() => setActive(i)}
            />
          </Scroller.Item>
        );
      })}
    </Scroller>
  );
};

const Item = ({ item, i, items, ...rest }) => {
  // const width = useMemo(() => Math.random() * 100 + 100, []);

  return (
    <div
      style={{
        padding: 4,
        width: 480,
      }}
    >
      <Card
        style={{
          // width: '100%',
          height: 180,
          background: '#eee',
          // marginRight: 12,
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

export const VerticalScrollerStory = () => {
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

  const [active, setActive] = useState(6);

  return (
    <Scroller
      targetIndex={active}
      // onScrollChange={console.log}
      direction="vertical"
      style={{
        // width: '100%',
        width: 480,
        height: 480,
        margin: '100px auto',
        padding: '12px 12px 0 12px',
        borderRadius: 12,
        boxShadow: 'rgb(175 175 175 / 40%) 1px 1px 8px 0px',
      }}
    >
      {items.map((item, i, items) => {
        return (
          <Scroller.Item key={item.key} i={i}>
            <VerticalItem
              item={item}
              i={i}
              items={items}
              onClick={() => setActive(i)}
            />
          </Scroller.Item>
        );
      })}
    </Scroller>
  );
};

const VerticalItem = ({ item, i, items, ...rest }) => {
  const height = useMemo(() => Math.random() * 150 + 50, []);

  return (
    <Card
      style={{
        height,
        background: '#eee',
        marginBottom: 12,
        display: 'grid',
        placeContent: 'center',
        cursor: 'pointer',
      }}
      {...rest}
    >
      <Title>{item?.title}</Title>
    </Card>
  );
};

export const FullScrollerStory = () => {
  const items = useMemo(() => {
    return [
      { key: 'item1', title: 'item1' },
      { key: 'item2', title: 'item2' },
      { key: 'item3', title: 'item3' },
      { key: 'item4', title: 'item4' },
      { key: 'item5', title: 'item5' },
    ];
  }, []);

  const [active, setActive] = useState(0);

  return (
    <Scroller
      targetIndex={active}
      // onScrollChange={console.log}
      direction="vertical"
      delay={36}
      style={{
        width: 'calc(100vw - 2rem)',
        height: 'calc(100vh - 2rem)',
      }}
    >
      {items.map((item, i, items) => {
        return (
          <Scroller.Item key={item.key} i={i}>
            <FullItem
              item={item}
              i={i}
              items={items}
              onClick={() => setActive(i)}
            />
          </Scroller.Item>
        );
      })}
    </Scroller>
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
