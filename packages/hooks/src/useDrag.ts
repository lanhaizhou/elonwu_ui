import React, {
  useCallback,
  useEffect,
  useRef,
  MutableRefObject,
  FC,
} from 'react';
import { throttle } from '@elonwu/utils';

export interface SetDataTrasferParams {
  data?: any;
  effectAllowed?:
    | 'none'
    | 'copy'
    | 'copyLink'
    | 'copyMove'
    | 'link'
    | 'linkMove'
    | 'move'
    | 'all'
    | 'uninitialized';

  image: string;
  imgWidth: number;
  imgHeight: number;
}

export interface DragEvents {
  onDragStart?: (
    e: DragEvent,
    extra: {
      target: EventTarget;
      setDataTransfer: (params: SetDataTrasferParams) => void;
    },
  ) => void;
  onDrag?: (
    e: DragEvent,
    extra: {
      target: EventTarget;
      setDataTransfer: (params: SetDataTrasferParams) => void;
    },
  ) => void;
  onDragEnd?: (e: DragEvent, extra: { target: EventTarget | null }) => void;
}

export const useDrag = (
  ref: MutableRefObject<HTMLElement | null>,
  { onDragStart, onDrag, onDragEnd }: DragEvents,
): void => {
  const setDataTransfer = useCallback(
    (
      e: DragEvent,
      { data, image, effectAllowed, imgWidth, imgHeight }: SetDataTrasferParams,
    ) => {
      if (!e.dataTransfer) return;

      e.dataTransfer.setData('text/plain', JSON.stringify(data ?? {}));
      e.dataTransfer.effectAllowed = effectAllowed || 'move';

      if (image) {
        const img = new Image();
        img.src = image;
        img.onload = () => {
          if (!e.dataTransfer) return;
          e.dataTransfer.setDragImage(img, imgWidth || 50, imgHeight || 50);
        };
      }
    },
    [],
  );

  const onDragStartWrapper = useCallback(
    (e: DragEvent) => {
      const target: EventTarget | null = e.currentTarget;
      if (onDragStart && target) {
        onDragStart(e, {
          target,
          setDataTransfer: (params) => setDataTransfer(e, params),
        });
      }
    },
    [onDragStart, setDataTransfer],
  );

  const onDragWrapper = useCallback(
    (e: DragEvent) => {
      const target: EventTarget | null = e.currentTarget;

      if (onDrag && target) {
        onDrag(e, {
          target,
          setDataTransfer: (params) => setDataTransfer(e, params),
        });
      }
    },
    [onDrag, setDataTransfer],
  );

  const onDragEndWrapper = useCallback(
    (e: DragEvent) => {
      const target: EventTarget | null = e.currentTarget;

      onDragEnd && onDragEnd(e, { target });
    },
    [onDragEnd],
  );

  useEffect(() => {
    const node = ref?.current;
    if (!node) return;
    if (!node.draggable) node.draggable = true;
  }, []);

  useEffect(() => {
    const node = ref?.current;
    if (!node || !onDragStartWrapper) return;

    node.addEventListener('dragstart', onDragStartWrapper);

    return () => {
      node.removeEventListener('dragstart', onDragStartWrapper);
    };
  }, []);

  useEffect(() => {
    const node = ref?.current;
    if (!node || !onDragWrapper) return;

    node.addEventListener('drag', onDragWrapper);

    return () => {
      node.removeEventListener('drag', onDragWrapper);
    };
  }, []);

  useEffect(() => {
    const node = ref?.current;
    if (!node || !onDragEndWrapper) return;

    node.addEventListener('dragend', onDragEndWrapper);

    return () => {
      node.removeEventListener('dragend', onDragEndWrapper);
    };
  }, []);
};
