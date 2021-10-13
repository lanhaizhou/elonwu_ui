import { MutableRefObject, useEffect, useRef, useState } from 'react';

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
    const observer = new ResizeObserver((entries: ResizeObserverEntry[]) =>
      setRect(entries[0].contentRect),
    );
    observer.observe(target);

    return () => observer.disconnect();
  }, [targetRef?.current]);

  return rect;
};
