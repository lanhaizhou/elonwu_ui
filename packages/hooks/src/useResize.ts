import { MutableRefObject, useEffect, useState } from 'react';
import { debounce } from '@elonwu/utils';

export const useResize = (
  targetRef: MutableRefObject<HTMLElement | undefined>,
): DOMRectReadOnly => {
  const [rect, setRect] = useState<DOMRectReadOnly>({
    width: 0,
    height: 0,
    top: 0,
    left: 0,
  } as DOMRectReadOnly);

  useEffect(() => {
    const target = targetRef?.current;
    if (!target) return;

    // 设置观察对象
    const observer = new ResizeObserver(
      debounce((entries: ResizeObserverEntry[]) => {
        setRect(entries[0].target.getBoundingClientRect());
      }, 20),
    );
    observer.observe(target);

    return () => observer.disconnect();
  }, []);

  return rect;
};
