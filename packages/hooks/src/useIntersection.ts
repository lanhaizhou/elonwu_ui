import {
  MutableRefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import { strip, formatRound, isValidArray, notNil } from '@elonwu/utils';

export interface IntersectionObserverProps {
  rootRef?: MutableRefObject<HTMLElement | undefined>;
  targetRef?: MutableRefObject<HTMLElement | undefined>;
  options?: {
    step?: number;
    margin?: number;
  };
}

export interface IntersectionObserverResult {
  visible: boolean;
  ratio: number;
  target: Element | null;
}

export const useIntersection = ({
  rootRef,
  targetRef,
  options,
}: IntersectionObserverProps): IntersectionObserverResult => {
  const [
    observeResult,
    setObserverResult,
  ] = useState<IntersectionObserverResult>({
    visible: false,
    ratio: 0,
    target: null,
  });

  useEffect(() => {
    const targetNode = targetRef?.current;

    if (!targetNode) return;

    // 初始化监听
    const observer = new IntersectionObserver(
      (
        entries: IntersectionObserverEntry[],
        observer: IntersectionObserver,
      ) => {
        const {
          intersectionRatio,
          isIntersecting,
          target,
          // boundingClientRect, intersectionRect, rootBounds, time,
        } = entries[0];

        // 更新监测结果
        setObserverResult({
          visible: isIntersecting,
          ratio: formatRound(intersectionRatio),
          target,
        });
      },
      {
        root: rootRef?.current || document,
        rootMargin: `${options?.margin || 0}px`,
        threshold: genThreshHold(options?.step || 0.1),
      },
    );
    // 监听目标
    observer.observe(targetNode);

    // 关闭监听
    return () => observer.disconnect();
  }, [rootRef, targetRef, options]);

  return observeResult;
};

// 生成相交比例检测精度
const genThreshHold = (step: number): number[] | number => {
  let threshold: number[] | number = 1.0; // 默认设置

  if (typeof step === 'number' && step > 0 && step < 1) {
    const steps: number[] = [];
    for (let curr = 0; curr <= 1; curr += step) {
      steps.push(strip(curr));
    }

    // 保证为 1 时能被检测
    if (steps[steps.length - 1] !== 1) steps.push(1);

    threshold = steps;
  }

  return threshold;
};
