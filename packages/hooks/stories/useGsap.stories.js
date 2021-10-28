import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { Title, Text, Card } from '@elonwu/web';
import { useAnimateTo, useAnimateFrom, useTimeline, useAnim } from '../src';

export default {
  title: 'Hooks/useAnimation',
};

export const UseAnimateStory = () => {
  const target = useRef();

  useAnimateFrom(target, {
    x: 100,
    y: -100,
    scale: 0.5,
    opacity: 0,
    delay: 2,
  });

  const animateTo = useAnimateTo(target);

  const [active, setActive] = useState(false);

  const onClick = useCallback(() => {
    animateTo(
      active
        ? { scale: 1, rotate: 0, x: 0, onComplete: () => setActive(false) }
        : {
            scale: 0.5,
            rotate: 360,
            x: -200,
            onComplete: () => setActive(true),
          },
    );
  }, [active]);

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        display: 'grid',
        placeContent: 'stretch',
        placeItems: 'center',
        background: '#fcfcfc',
      }}
    >
      <div
        style={{
          width: 200,
          height: 200,
          background: '#99aaee',
          display: 'grid',
          placeContent: 'center',
        }}
        ref={target}
        onClick={onClick}
      >
        TargetTo
      </div>
    </div>
  );
};

export const UseTimelineStory = () => {
  const target = useRef();
  const target2 = useRef();

  const timeline = useTimeline([
    { method: 'from', target, options: { x: 100, duration: 0.45 } },
    [
      { method: 'to', target, options: { x: -100, duration: 0.45 } },
      { method: 'to', target: target2, options: { y: -100, duration: 0.45 } },
    ],

    [
      { method: 'to', target: target2, options: { x: -200, duration: 0.45 } },
      { method: 'to', target, options: { y: -200, duration: 0.45 } },
    ],

    { method: 'to', target, options: { x: -100, duration: 0.45 } },
    { method: 'to', target: target2, options: { y: 100, duration: 0.45 } },
  ]);

  useEffect(() => {
    timeline.play();
  }, []);

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        display: 'grid',
        placeContent: 'stretch',
        placeItems: 'center',
        background: '#fcfcfc',
      }}
    >
      <Card
        style={{
          width: 200,
          height: 200,
          background: '#ee99aa',
          display: 'grid',
          placeContent: 'center',
        }}
        ref={target2}
      >
        Target2
      </Card>

      <Card
        style={{
          width: 200,
          height: 200,
          background: '#99aaee',
          display: 'grid',
          placeContent: 'center',
        }}
        ref={target}
        onClick={() => timeline.restart()}
      >
        Target1
      </Card>
    </div>
  );
};

export const UseAnimStory = () => {
  const anim = useAnim('.card');

  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    if (animating) return;

    anim({
      // loop: true,
      easing: 'easeInElastic(1, .6)',

      direction: 'alternate',

      backgroundColor: () =>
        `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(
          Math.random() * 255,
        )}, ${Math.floor(Math.random() * 255)}, 04)`,
      translateX: (_, i) => 80 * (i % 4),
      translateY: (_, i) => -50 * (i % 4),
      // translateX: () => Math.random() * 400 - 200,
      // translateY: () => Math.random() * 400 - 200,
      rotate: () => Math.random() * 180 + 180,
      scale: () => Math.random() * 2,
      borderRadius: () => `${Math.floor(Math.random() * 40 + 10)}%`,

      duration: () => Math.random() * 800,
      // delay: () => Math.random() * 400,
      delay: 800,
      begin: () => setAnimating(true),
      complete: () => setAnimating(false),
    });
  }, [animating]);

  const list = useMemo(() => Array.from(new Array(16)).map((_, i) => i, []));

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        cursor: 'pointer',
        display: 'grid',
        placeContent: 'center',
        placeItems: 'center',
      }}
    >
      <div
        style={{
          display: 'inline-grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          padding: '25%',
          gap: 16,
        }}
      >
        {list.map((i) => (
          <Card
            key={i}
            className="card"
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: '#99aaee',
              display: 'grid',
              placeContent: 'center',
            }}
            // ref={target}
          />
        ))}
      </div>
    </div>
  );
};

export const AnimateListStory = () => {
  const list = useMemo(() => Array.from(new Array(8)).map((_, i) => i, []));

  const anim = useAnim('.listItem');

  useEffect(() => {
    anim({
      easing: 'easeInElastic(1, .8)',
      translateX: ['-100%', 0],
      scale: [0, 1],
      opacity: [0, 1],
      duration: 1200,
      delay: (_, i) => 120 * i,
    });
  }, []);

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(1, 1fr)',
        gap: 16,
      }}
    >
      {list.map((i) => (
        <Card
          key={i}
          className="listItem"
          style={{
            width: 240,
            height: 48,
            background: '#99aaee',
            display: 'grid',
            placeContent: 'center',
          }}
        />
      ))}
    </div>
  );
};
