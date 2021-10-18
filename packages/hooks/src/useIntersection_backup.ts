import { MutableRefObject, useEffect, useRef, useState } from 'react';

import { strip, formatRound, isValidArray } from '@elonwu/utils';

export interface IntersectionObserveResult {
  visible: boolean;
  ratio: number;
}
export interface IntersectionObserverResult extends IntersectionObserveResult {
  root: MutableRefObject<HTMLElement | undefined>;
  target: MutableRefObject<HTMLElement | undefined>;
}

export const useIntersection = (options?: {
  step?: number;
  margin?: number;
}): IntersectionObserverResult => {
  const [observeResult, setObserveResult] = useState<IntersectionObserveResult>(
    {
      visible: false,
      ratio: 0,
    },
  );

  const observerRef = useRef<IntersectionObserver>();
  const rootRef = useRef<HTMLElement>();
  const targetRef = useRef<HTMLElement>();

  useEffect(() => {
    // 设定测量精度
    let threshold: number[] = [];
    const step = options?.step || 1;

    if (typeof step === 'number' && step > 0 && step < 1) {
      const steps: number[] = [];
      for (let curr = 0; curr < 1; curr += step) {
        steps.push(strip(curr));
      }

      if (steps[steps.length - 1] !== 1) steps.push(1);

      threshold = steps;
    }

    // 清空现有观察对象
    if (observerRef.current) observerRef.current.disconnect();

    // 重置观察对象
    observerRef.current = new IntersectionObserver(
      (
        entries: IntersectionObserverEntry[],
        // observer: IntersectionObserver,
      ) => {
        const { intersectionRatio, isIntersecting } = entries[0];

        setObserveResult({
          visible: isIntersecting,
          ratio: formatRound(intersectionRatio),
        });
      },
      {
        root: rootRef?.current || document,
        rootMargin: `${options?.margin || 0}px`,
        threshold,
      },
    );
  }, [options]);

  useEffect(() => {
    const observer = observerRef?.current;
    const target = targetRef?.current;
    const canObserve = observer && target;

    if (canObserve) observer.observe(target);
    return () => {
      if (canObserve) observer.unobserve(target);
    };
  }, [observerRef?.current]);

  return { root: rootRef, target: targetRef, ...observeResult };
};
