import React, { useCallback, useMemo, useState } from 'react';

import { Card } from '@elonwu/web-card';
import { Carousel } from '../src';

export default {
  title: 'Components/Compose/Carousel',
  component: Carousel,
};

export const CarouselStory = () => {
  const items = useMemo(
    () =>
      [1, 2, 3, 4, 5, 6, 7].map((i) => (
        <Card
          key={i}
          style={{
            width: 400,
            height: 240,
            position: 'relative',
          }}
        >
          sdajsdjasd
        </Card>
      )),
    [],
  );

  const stylize = useCallback(({ offset, absOffset }) => {
    return {
      opacity: absOffset > 1 ? 0 : 1,
      background: absOffset === 0 ? 'blue' : 'lightblue',
      // transform: `translateX(${offset * 100}%)`,
      // transform: `translateX(${offset * 80}%) scale(${
      //   offset === 0 ? 1 : 0.5
      // })`,
      // transform: `translateX(${offset * 70}%)  translateY(${
      //   absOffset * -50
      // }%)  skew(${offset * -15}deg) scale(${offset === 0 ? 1 : 0.5})`,
      transform: `translateX(${offset * 80}%) translateY(${offset * -50}%) `,
    };
  }, []);

  return (
    <Carousel
      items={items}
      stylize={stylize}
      style={{
        width: 800,
        height: 480,
        borderRadius: 16,
        background: '#fcfcfc',
      }}
    />
  );
};
