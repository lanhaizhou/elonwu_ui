import React, {
  FC,
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
  MutableRefObject,
  ReactNode,
  CSSProperties,
  EventHandler,
  UIEventHandler,
  BaseSyntheticEvent,
} from 'react';

import { debounce, throttle } from '@elonwu/utils';
import { createContext } from '@elonwu/hooks';

const { Provider, useContext } = createContext('Scroller');

const useScroller = useContext;
/**
 *  Scroller
 */

export type ScrollDirection = 'horizontal' | 'vertical';

export interface ScrollerProps {
  style?: CSSProperties;
  children?: ReactNode;
  onScrollChange?: (observance: ScrollObservance) => void; // 滚动监听
  targetIndex?: number; // 指定下标元素
  direction?: ScrollDirection; // 滚动方向
  delay?: number; // 自动吸附的延迟
}

export interface ScrollObservance {
  max: number;
  curr: number;
  percent: number;
}

const Item: FC<{ i: number }> = (props) => {
  // 当前子元素
  const targetRef = useRef<HTMLDivElement>(null);

  // 获取 context
  const {
    direction,
    parentRef,
    onSetItem,
  }: {
    direction: ScrollDirection;
    parentRef: MutableRefObject<HTMLElement>;
    onSetItem: (targetLeft: number, i: number) => void;
  } = useScroller();

  const getDistance = useCallback(() => {
    let distance = 0;

    if (!parentRef.current || !targetRef.current) return distance;

    const containerRect = parentRef.current.getBoundingClientRect();
    const targetRect = targetRef.current.getBoundingClientRect();

    // 计算顶部距离
    if (direction === 'vertical') {
      const scrollTop = parentRef.current.scrollTop;
      const containerPaddingTop = getComputedStyle(
        parentRef.current,
        null,
      ).getPropertyValue('padding-top');

      distance =
        targetRect.top -
        containerRect.top +
        scrollTop -
        parseInt(containerPaddingTop);
    }
    // 计算左侧距离
    else {
      const scrollLeft = parentRef.current.scrollLeft;

      const containerPaddingLeft = getComputedStyle(
        parentRef.current,
        null,
      ).getPropertyValue('padding-left');

      distance =
        targetRect.left -
        containerRect.left +
        scrollLeft -
        parseInt(containerPaddingLeft);
    }

    return distance;
  }, [direction]);

  // 更新子元素的吸附位置
  useEffect(() => {
    const distance = getDistance();

    onSetItem(distance, props.i);
  }, [getDistance]);

  return <div style={{ flexShrink: 0 }} ref={targetRef} {...props} />;
};

const Scroller = ({
  children,
  style,
  targetIndex = 0,
  onScrollChange,
  direction = 'horizontal',
  delay = 200,
}: ScrollerProps) => {
  const [itemDistanceList, setItemDistanceList] = useState<number[]>([]);

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

  // 滚动到指定位置
  const scrollTo = useCallback((to: number, from?: number) => {
    if (typeof from === 'number') {
      // 不支持 smooth 滚动
      let currStep = from || 0;
      const step = (to - (from || 0)) / 60;

      const scrollByStep = () => {
        ref.current?.scrollTo(
          direction === 'vertical' ? { top: currStep } : { left: currStep },
        );

        if (currStep < to) {
          currStep += step;
          requestAnimationFrame(scrollByStep);
        }
      };
      scrollByStep();
    } else {
      // 支持 options 的浏览器
      ref.current?.scrollTo(
        direction === 'vertical'
          ? { top: to, behavior: 'smooth' }
          : { left: to, behavior: 'smooth' },
      );
    }
  }, []);

  const scrollToIndex = useCallback(
    (targetIndex: number) => {
      if (
        typeof targetIndex === 'number' &&
        targetIndex < itemDistanceList.length
      ) {
        scrollTo(itemDistanceList[targetIndex]);
      }
    },
    [itemDistanceList],
  );

  const scrollAuto = useCallback(
    (e) => {
      console.log(e);
    },
    [direction],
  );

  // 监听滚动中
  const onScrolling = useCallback(
    throttle(() => {
      const scroll = calcScroll();
      if (scroll && onScrollChange) onScrollChange(scroll);
    }, 16),
    [calcScroll, onScrollChange],
  );

  // 监听滚动结束
  const onScrollEnd = useCallback(
    debounce(() => {
      const scroll = calcScroll();
      if (scroll) {
        const { max, curr } = scroll;

        let scrollLeft = curr;

        // 未滚动到最右侧时，计算最近的滚动位置
        if (scrollLeft < max) {
          for (let i = 0; i < itemDistanceList.length; i++) {
            // 找到当前位置右侧
            if (curr <= itemDistanceList[i]) {
              let match = itemDistanceList[i];

              // 如果左侧离得更近
              if (
                i > 0 &&
                Math.abs(curr - itemDistanceList[i - 1]) <
                  Math.abs(curr - itemDistanceList[i])
              ) {
                match = itemDistanceList[i - 1];
              }

              scrollLeft = Math.min(max, match);
              break;
            }
          }
        }

        scrollTo(scrollLeft);
      }
    }, delay),
    [calcScroll, itemDistanceList, delay],
  );

  // 触发滚动
  const onScroll = useCallback(() => {
    onScrolling();
    onScrollEnd();
  }, [scrollAuto, onScrolling, onScrollEnd]);

  // 更新子元素位置
  const onSetItem = useCallback((distance: number, i: number) => {
    console.log(i, distance);
    setItemDistanceList((prev) => {
      let next = prev.slice();
      next[i] = distance;
      return next;
    });
  }, []);

  // 滚动到指定下标
  useEffect(() => {
    scrollToIndex(targetIndex);
  }, [targetIndex]);

  const scrollStyle = useCallback(() => {
    if (direction === 'vertical') {
      return {
        flexDirection: 'column',
        overflowX: 'hidden',
      };
    }

    return {
      alignItems: 'center',
      overflowY: 'hidden',
    };
  }, [direction]);

  return (
    <Provider value={{ onSetItem, direction, parentRef: ref }}>
      <div
        className="Scroller"
        onScroll={onScroll}
        ref={ref}
        style={Object.assign(
          {
            display: 'flex',
            flexWrap: 'nowrap',
            overflow: 'scroll',
          },
          scrollStyle(),
          style,
        )}
      >
        {children}
      </div>
    </Provider>
  );
};

Scroller.Item = Item;

export { Scroller, useScroller };
