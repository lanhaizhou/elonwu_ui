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

export type PortalType = 'Modal' | 'Notice' | 'Message' | 'Tooltip' | 'Popover';

export type TriggerEvent = 'click' | 'hover';

export interface PortalProps {
  portalType: PortalType;

  visible?: boolean;
  portalStyle?: CSSProperties;
  overlayStyle?: CSSProperties;
  content?: ReactNode;
  onChange: (visible: boolean) => void;

  trigger: ReactElement;
  triggerEvents?: TriggerEvent[];
}

export interface PortalResult {
  visible: boolean;
  onShow: (visible: boolean) => void;
  onDismiss: (visible: boolean) => void;
  portalContent: ReactNode;
}

export const usePortal = ({
  portalType,
  portalStyle,
  overlayStyle,
  visible: overrideVisible,
  content,
  onChange,
  trigger,
  triggerEvents,
}: PortalProps): PortalResult => {
  const [visible, setVisible] = useState<boolean>(false);

  const [portal, setPortal] = useState<ReactPortal | null>();

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
      const overlayId: string = `overlay-container-${Date.now()}`;

      overlayContainer.id = overlayId;

      portalContainer.appendChild(overlayContainer);
    }
  }, [portalContainer]);

  const overridePortalStyle = useMemo(() => {
    return Object.assign(
      {},
      portalStyle,
      visible
        ? { overflow: 'visible', opacity: 1, visibility: 'visible' }
        : {
            overflow: 'hidden',
            opacity: 0,
            visibility: 'none',
            padding: 0,
            margin: 0,
          },
    );
  }, [portalStyle, visible]);

  // protal 容器样式
  useEffect(() => {
    portalContainer.id = portalType;

    portalContainer.style.position = 'absolute';
    portalContainer.style.top = '0px';
    portalContainer.style.left = '0px';
    portalContainer.style.right = '0px';
    portalContainer.style.height = '0px';

    if (overridePortalStyle && Object?.keys(overridePortalStyle)) {
      for (let [key, value] of Object.entries(overridePortalStyle)) {
        portalContainer.style[key] = value;
      }
    }
  }, [portalContainer, portalType, overridePortalStyle]);

  // overlay 容器样式
  const overrideOverlayStyle = useMemo(() => {
    return Object.assign(
      // 默认样式
      {
        width: '100vw',
        height: 0,
      },
      overlayStyle,

      visible ? { visibility: 'visible' } : { visibility: 'none' },
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
    const overlayContainer: HTMLDivElement | null = overlayRef.current;
    const portal = ReactDOM.createPortal(content, overlayContainer);
    setPortal(portal);

    setVisible(true);
    onChange && onChange(true);
  }, [onChange, content]);

  const onDismiss = useCallback(() => {
    setPortal(null);

    setVisible(false);
    onChange && onChange(false);
  }, [onChange]);

  useEffect(() => {
    if (typeof overrideVisible === 'boolean' && visible !== overrideVisible) {
      setVisible(overrideVisible);

      if (overrideVisible) {
        onShow();
      } else {
        onDismiss();
      }
    }
  }, [visible, overrideVisible, content, onShow, onDismiss]);

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
    return React.cloneElement(trigger, eventProps);
  }, [trigger, triggerEvents, onShow, onDismiss]);

  console.log({
    trigger,
    triggerDom,
  });

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
