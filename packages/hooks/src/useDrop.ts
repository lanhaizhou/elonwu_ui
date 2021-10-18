import { useCallback, useEffect, MutableRefObject } from 'react';

export interface DropExtra {
  target: EventTarget | null;
  data?: any;
}

export interface DropEvents {
  onDragEnter?: (e: DragEvent, extra: DropExtra) => void;
  onDragOver?: (e: DragEvent, extra: DropExtra) => void;
  onDragLeave?: (e: DragEvent, extra: DropExtra) => void;
  onDrop?: (e: DragEvent, extra: DropExtra) => void;
}

export const useDrop = function (
  ref: MutableRefObject<HTMLElement | null>,
  { onDragEnter, onDragOver, onDragLeave, onDrop }: DropEvents,
): void {
  /**************************************
   * 进入
   */
  const onDragEnterWrapper = useCallback(
    (e: DragEvent) => {
      // 此处禁止默认后才能 drop
      e.preventDefault();

      if (!e.dataTransfer) return;

      const target: EventTarget | null = e.currentTarget;
      e.dataTransfer.dropEffect = 'copy';

      if (onDragEnter && target) onDragEnter(e, { target });
    },
    [onDragEnter],
  );

  // 事件绑定
  useEffect(() => {
    const node = ref?.current;
    if (!node || !onDragEnterWrapper) return;

    node.addEventListener('dragenter', onDragEnterWrapper);

    return () => {
      node.removeEventListener('dragenter', onDragEnterWrapper);
    };
  }, []);
  /*
   * 进入
   *************************************/

  /**************************************
   * 悬停
   */
  const onDragOverWrapper = useCallback(
    (e: DragEvent) => {
      // 此处禁止默认后才能 drop
      e.preventDefault();

      if (!e.dataTransfer) return;
      const target: EventTarget | null = e.currentTarget;
      if (onDragOver && target) onDragOver(e, { target });
    },
    [onDragOver],
  );

  // 事件绑定
  useEffect(() => {
    const node = ref?.current;
    if (!node) return;

    node.addEventListener('dragover', onDragOverWrapper);

    return () => {
      node.removeEventListener('dragover', onDragOverWrapper);
    };
  }, []);
  /*
   * 悬停
   *************************************/

  /**************************************
   * 离开
   */
  const onDragLeaveWrapper = useCallback(
    (e: DragEvent) => {
      const target: EventTarget | null = e.currentTarget;
      if (onDragLeave && target) onDragLeave(e, { target });
    },
    [onDragLeave],
  );
  // 事件绑定
  useEffect(() => {
    const node = ref?.current;
    if (!node) return;

    node.addEventListener('dragleave', onDragLeaveWrapper);

    return () => {
      node.removeEventListener('dragleave', onDragLeaveWrapper);
    };
  }, []);
  /*
   * 离开
   *************************************/

  /**************************************
   * 放置
   */

  const onDropWrapper = useCallback(
    (e: DragEvent) => {
      const target: EventTarget | null = e.currentTarget;
      const data = JSON.parse(
        e.dataTransfer?.getData('text/plain') || JSON.stringify({}),
      );
      onDrop && onDrop(e, { target, data });
    },
    [onDrop],
  );
  // 事件绑定
  useEffect(() => {
    const node = ref?.current;
    if (!node) return;
    node.addEventListener('drop', onDropWrapper);

    return () => {
      node.removeEventListener('drop', onDropWrapper);
    };

    /*
     * 放置
     *************************************/
  }, []);
};
