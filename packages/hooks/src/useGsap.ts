import {
  MutableRefObject,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
} from 'react';

import { gsap } from 'gsap';
import { notNil } from '@elonwu/utils';

// Global types
// type GSAPDraggableVars = Draggable.Vars;
// type GSAPAnimation = gsap.core.Animation;
// type GSAPCallback = gsap.Callback;
// type GSAPDistributeConfig = gsap.utils.DistributeConfig;
// type GSAPPlugin = gsap.Plugin;
// type GSAPPluginScope = gsap.PluginScope;
// type GSAPPluginStatic = gsap.PluginStatic;
// type GSAPStaggerVars = gsap.StaggerVars;
// type GSAPTickerCallback = gsap.TickerCallback;
type GSAPTimeline = gsap.core.Timeline;
type GSAPTimelineVars = gsap.TimelineVars;
type GSAPTween = gsap.core.Tween;
type GSAPTweenTarget = gsap.TweenTarget;
type GSAPTweenVars = gsap.TweenVars;

type Animate = (params: GSAPTweenVars) => GSAPTween;

const defaultAnimation = {
  duration: 0.45,
  delay: 0,
  ease: 'cubic-bezier(0.71, -0.24, 0.64, 1.49)',
};

export const useAnimateTo = (
  targetRef: MutableRefObject<HTMLElement>,
  params?: GSAPTweenVars,
  immediate?: boolean,
): Animate => {
  const animate = useCallback(
    (params) =>
      gsap.to(targetRef.current, Object.assign({}, defaultAnimation, params)),
    [],
  );

  useLayoutEffect(() => {
    if (immediate && notNil(params)) {
      animate(params);
    }
  }, []);

  return animate;
};

export const useAnimateFrom = (
  targetRef: MutableRefObject<HTMLElement>,
  params?: GSAPTweenVars,
  immediate?: boolean,
): Animate => {
  const animate = useCallback(
    (params) =>
      gsap.from(targetRef.current, Object.assign({}, defaultAnimation, params)),
    [],
  );

  useLayoutEffect(() => {
    let tween: GSAPTween;

    if (immediate !== false && notNil(params)) {
      tween = animate(
        Object.assign({}, params, {
          onComplete: () => {
            console.log(tween);
            tween.kill();
          },
        }),
      );
    }

    // return () => {
    // };
  }, []);

  return animate;
};

export const useTimeline = (steps: any[]): GSAPTimeline => {
  const timelineRef = useRef<GSAPTimeline>(
    gsap.timeline({ duration: 0.2, delay: 0, paused: true }),
  );

  useLayoutEffect(() => {
    const tl: GSAPTimeline = timelineRef.current;

    const timer = Date.now();

    steps.forEach((step, i) => {
      if (Array.isArray(step)) {
        const prevStepLabel = `${timer}-step-${i}`;
        tl.addLabel(prevStepLabel);
        step.forEach(({ method, target, options }) =>
          tl[method](target.current, options, prevStepLabel),
        );
      } else {
        if ('method' in step) {
          const { method, target, options } = step;
          tl[method](target.current, options);
        } else {
          tl.add(step);
        }
      }
    });
  }, []);

  return timelineRef.current;
};
