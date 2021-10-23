import React, {
  FC,
  useRef,
  useCallback,
  ReactNode,
  CSSProperties,
  useMemo,
} from 'react';

import { throttle } from '@elonwu/utils';
import { ScrollDirection, ScrollObservance } from './scroller';

/**
 *  Scroller
 */
export interface SnapScrollerProps {
  style?: CSSProperties;
  children?: ReactNode;
  onScrollChange?: (observance: ScrollObservance) => void; // 滚动监听
  direction?: ScrollDirection; // 滚动方向
}
const Item: FC<{ i: number }> = (props) => {
  return <div style={{ flexShrink: 0, scrollSnapAlign: 'start' }} {...props} />;
};

const SnapScroller = ({
  children,
  style,
  onScrollChange,
  direction = 'horizontal',
}: SnapScrollerProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const calcScroll = useCallback<() => ScrollObservance | null>(() => {
    if (!ref.current) return null;

    let max, curr;

    const { width, height } = ref.current.getBoundingClientRect();

    // 计算纵向滚动
    if (direction === 'vertical') {
      const scrollHeight = ref.current.scrollHeight;
      const scrollTop = ref.current.scrollTop;

      max = scrollHeight - height;
      curr = scrollTop;
    }

    // 计算横向滚动
    else {
      const scrollWidth = ref.current.scrollWidth;
      const scrollLeft = ref.current.scrollLeft;

      max = scrollWidth - width;
      curr = scrollLeft;
    }

    const percent = Math.floor((curr / max) * 100) / 100;

    return { max, curr, percent };
  }, [direction]);

  // 监听滚动中
  const onScroll = useCallback(
    throttle(() => {
      const scroll = calcScroll();
      if (scroll && onScrollChange) onScrollChange(scroll);
    }, 16),
    [calcScroll, onScrollChange],
  );

  const scrollStyle = useMemo(() => {
    let scrollStyle = {};

    if (direction === 'vertical') {
      scrollStyle = {
        flexDirection: 'column',
        scrollSnapType: 'y mandatory',
      };
    } else {
      scrollStyle = {
        alignItems: 'center',
        scrollSnapType: 'x mandatory',
      };
    }

    return Object.assign(
      {
        display: 'flex',
        flexWrap: 'nowrap',
        overflow: 'scroll',
        scrollSnapStop: 'always',
      },
      scrollStyle,
      style,
    );
  }, [direction, style]);

  return (
    <div ref={ref} className="Scroller" onScroll={onScroll} style={scrollStyle}>
      {children}
    </div>
  );
};

SnapScroller.Item = Item;

export { SnapScroller };
