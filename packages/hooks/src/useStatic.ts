import { useEffect, useMemo, EffectCallback } from 'react';

/**
 * @description 使用无依赖的 hook 时， 避免写回调和 deps
 */

export const useStaticMemo = function <T>(staticProps: T): T {
  return useMemo<T>(() => staticProps, []);
};

export const useStaticEffect = function (cb: EffectCallback): void {
  useEffect(cb, []);
};
