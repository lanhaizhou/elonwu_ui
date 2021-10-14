import { MutableRefObject, useEffect, useRef, useState } from 'react';

export interface ResizeObserverResult {
  target: MutableRefObject<HTMLElement | undefined>;
  rect: DOMRectReadOnly;
}

export const useResize = (): ResizeObserverResult => {
  const [rect, setRect] = useState<DOMRectReadOnly>({
    width: 0,
    height: 0,
    top: 0,
    left: 0,
  } as DOMRectReadOnly);

  const observerRef = useRef<ResizeObserver>();
  const targetRef = useRef<HTMLElement>();

  useEffect(() => {
    // 设置观察对象
    observerRef.current = new ResizeObserver((entries: ResizeObserverEntry[]) =>
      setRect(entries[0].contentRect),
    );

    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, []);

  useEffect(() => {
    const observer = observerRef?.current;
    const target = targetRef?.current;
    const canObserve = observer && target;

    if (canObserve) observer.observe(target);
    return () => {
      if (canObserve) observer.unobserve(target);
    };
  }, [targetRef?.current, observerRef?.current]);

  return { target: targetRef, rect };
};
