import { MutableRefObject, useCallback } from 'react';
import anime from 'animejs';

export const useAnim = (targets: any) => {
  return useCallback((options) => {
    anime({
      targets,
      ...options,
    });
  }, []);
};
