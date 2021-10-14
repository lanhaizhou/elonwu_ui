import ReactDOM from 'react-dom';
import React, {
  useCallback,
  useRef,
  useState,
  useMemo,
  CSSProperties,
  useEffect,
  ReactPortal,
  ReactNode,
  MutableRefObject,
  ReactElement,
} from 'react';

import { isValidArray } from '@elonwu/utils';

export type PortalType =
  | 'Modal'
  | 'Drawer'
  | 'Notice'
  | 'Message'
  | 'Tooltip'
  | 'Popover';

export type TriggerEvent = 'click' | 'hover';

export type Position =
  | 'topLeft'
  | 'top'
  | 'topRight'
  | 'bottomLeft'
  | 'bottom'
  | 'bottomRight';

export interface PortalProps {
  portalType: PortalType;

  visible?: boolean;
  contentStyle?: CSSProperties;
  overlayStyle?: CSSProperties;
  content?: ReactNode;
  onChange: (visible: boolean) => void;

  trigger: ReactElement;
  triggerEvents?: TriggerEvent[];
  position?: Position;
}

export interface PortalResult {
  visible: boolean;
  onShow: () => void;
  onDismiss: () => void;
  portalContent: ReactNode;
}

export const usePortal = ({
  portalType,
  contentStyle,
  overlayStyle,
  visible: overrideVisible,
  content,
  onChange,
  trigger,
  triggerEvents,
  position,
}: PortalProps): PortalResult => {
  const [visible, setVisible] = useState<boolean>(false);

  const [portal, setPortal] = useState<ReactPortal | null>();

  const triggerRef: MutableRefObject<HTMLElement | undefined> = useRef();

  // 在 body 中增加 portal 容器
  const portalContainer: HTMLDivElement = useMemo(() => {
    let portalContainer: HTMLDivElement | null = document.body.querySelector(
      `#root ~ #${portalType}`,
    );

    if (!portalContainer) {
      portalContainer = document.createElement('div');
      document.body.appendChild(portalContainer);
    }

    return portalContainer;
  }, [portalType]);

  // 在 portal 容器中增加 overlay 容器
  const overlayRef: MutableRefObject<HTMLDivElement> = useRef(
    document.createElement('div'),
  );

  useEffect(() => {
    const overlayContainer: HTMLDivElement | null = overlayRef.current;

    if (overlayContainer) {
      const overlayCls: string = `overlay-container`;

      overlayContainer.classList.add(overlayCls);

      portalContainer.appendChild(overlayContainer);
    }
  }, [portalContainer]);

  const overrideContentStyle = useMemo(() => {
    let triggerPosition: CSSProperties = {};

    if (position) {
      const { top, left, width, height } = (
        triggerRef?.current || document.body
      ).getBoundingClientRect();
      triggerPosition = {
        position: 'absolute',
        left,
        top: top + height + 16,
      };
    }

    return Object.assign(
      {},
      contentStyle,
      triggerPosition,
      visible
        ? { overflow: 'visible', opacity: 1, visibility: 'visible' }
        : {
            overflow: 'hidden',
            opacity: 0,
            visibility: 'hidden',
          },
    );
  }, [contentStyle, visible, triggerRef, position]);

  // protal 容器样式
  useEffect(() => {
    portalContainer.id = portalType;

    portalContainer.style.position = 'absolute';
    portalContainer.style.top = '0px';
    portalContainer.style.left = '0px';
    portalContainer.style.right = '0px';
    portalContainer.style.height = '0px';
  }, [portalContainer, portalType]);

  // overlay 容器样式
  const overrideOverlayStyle = useMemo(() => {
    return Object.assign(
      // 默认样式
      { width: '100vw' },
      overlayStyle,
      visible ? { visibility: 'visible' } : { visibility: 'hidden', hiehgt: 0 },
    );
  }, [overlayStyle, visible]);

  useEffect(() => {
    const overlayContainer: HTMLDivElement | null = overlayRef.current;

    if (
      overlayContainer &&
      overrideOverlayStyle &&
      Object?.keys(overrideOverlayStyle)
    ) {
      for (let [key, value] of Object.entries(overrideOverlayStyle)) {
        overlayContainer.style[key] = value;
      }
    }
  }, [overrideOverlayStyle]);

  const onShow = useCallback(() => {
    onChange ? onChange(true) : setVisible(true);
  }, [onChange]);

  const onDismiss = useCallback(() => {
    onChange ? onChange(false) : setVisible(false);
  }, [onChange]);

  useEffect(() => {
    if (typeof overrideVisible === 'boolean' && visible !== overrideVisible) {
      setVisible(overrideVisible);
    }
  }, [visible, overrideVisible]);

  useEffect(() => {
    if (visible) {
      const overlayContainer: HTMLDivElement | null = overlayRef.current;

      const contentId: string = `content-container-${Date.now()}`;
      const contentContainer = React.createElement(
        'div',
        { id: contentId, style: overrideContentStyle },
        content,
      );

      const portal = ReactDOM.createPortal(contentContainer, overlayContainer);
      setPortal(portal);
    } else {
      setPortal(null);
    }
  }, [visible, content, overrideContentStyle]);

  const triggerDom = useMemo(() => {
    const eventProps: any = {};

    if (isValidArray(triggerEvents)) {
      triggerEvents?.forEach((type) => {
        switch (type) {
          case 'click':
            eventProps.onClick = onShow;
            break;

          case 'hover':
            eventProps.onMouseEnter = onShow;

            // overlay 会导致错误
            // eventProps.onMouseLeave = onDismiss;
            break;
        }
      });
    } else {
      eventProps.onClick = onShow;
    }
    return React.cloneElement(
      trigger,
      Object.assign({}, eventProps, { ref: position ? triggerRef : null }),
    );
  }, [trigger, triggerEvents, onShow, position, onDismiss]);

  useEffect(() => {
    const overlayContainer: HTMLDivElement | null = overlayRef.current;
    return () => overlayContainer?.remove();
  }, []);

  return {
    visible,
    onShow,
    onDismiss,
    portalContent: (
      <>
        {triggerDom}
        {portal}
      </>
    ),
  };
};
