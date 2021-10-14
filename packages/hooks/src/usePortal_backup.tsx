import React, {
  useMemo,
  useRef,
  useEffect,
  FC,
  MutableRefObject,
  CSSProperties,
  useState,
  useCallback,
} from 'react';
import ReactDom from 'react-dom';

import { Card } from '@elonwu/web-card';

export type PortalType = 'Modal' | 'Notice' | 'Message' | 'Tooltip' | 'Popover';

export interface PortalProps {
  visible?: Boolean;
  onShow?: Function;
  onDismiss?: Function;

  portalType: PortalType;
  portalStyle?: CSSProperties;
  overlayStyle?: CSSProperties;
}

export const usePortal = ({
  portalType,
  portalStyle,
  overlayStyle,
}: PortalProps) => {
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

  // protal 容器样式
  useEffect(() => {
    portalContainer.id = portalType;

    portalContainer.style.position = 'absolute';
    portalContainer.style.top = '0px';
    portalContainer.style.left = '0px';
    portalContainer.style.right = '0px';
    portalContainer.style.height = '0px';

    if (portalStyle && Object?.keys(portalStyle)) {
      for (let [key, value] of Object.entries(portalStyle)) {
        portalContainer.style[key] = value;
      }
    }
  }, [portalContainer, portalType, portalStyle]);

  // overlay 容器样式
  useEffect(() => {
    const overlayContainer: HTMLDivElement | null = overlayRef.current;

    if (overlayContainer && overlayStyle && Object?.keys(overlayStyle)) {
      for (let [key, value] of Object.entries(overlayStyle)) {
        overlayContainer.style[key] = value;
      }
    }
  }, [overlayStyle]);

  useEffect(() => {
    const overlayContainer: HTMLDivElement | null = overlayRef.current;
    return () => overlayContainer?.remove();
  }, []);

  return overlayRef;
};

const Portal: FC<{
  options: PortalProps;
  onOverlay: () => void;
}> = ({ children, options, onOverlay }) => {
  // 将内容添加到 overlay 容器
  const overlayRef = usePortal(options);

  useEffect(() => {
    overlayRef?.current.addEventListener('click', onOverlay);
    return () => overlayRef?.current.removeEventListener('click', onOverlay);
  }, [onOverlay]);

  return options?.visible && overlayRef?.current
    ? ReactDom.createPortal(children, overlayRef?.current)
    : null;
};

export interface ModalProps extends PortalProps {}

export const Modal: FC<ModalProps> = ({
  children,
  portalStyle,
  overlayStyle,

  onShow,
  onDismiss,
  visible,
}) => {
  const [modalVisible, setModalVisible] = useState<Boolean>(visible || true);

  useEffect(() => {
    if (typeof visible === 'boolean' && visible !== modalVisible) {
      setModalVisible(visible);
    }
  }, [visible, modalVisible]);

  const modalPortalStyle: CSSProperties = useMemo(() => {
    return Object.assign(
      {},
      portalStyle,
      modalVisible
        ? { overflow: 'visible', opacity: 1, visibility: 'visible' }
        : {
            overflow: 'hidden',
            opacity: 0,
            visibility: 'none',
            padding: 0,
            margin: 0,
          },
    );
  }, [portalStyle, modalVisible]);

  const modalOverlayStyle: CSSProperties = useMemo(() => {
    return Object.assign(
      // 默认样式
      {
        width: '100vw',
        height: '100vh',
        background: `rgba(0,0,0,.2)`,
        display: 'grid',
        placeContent: 'center',
        cursor: 'pointer',
      },
      overlayStyle,

      modalVisible ? { visibility: 'visible' } : { visibility: 'none' },
    );
  }, [portalStyle, modalVisible]);

  const onModalVisibleChange = useCallback<(visible: boolean) => void>(
    (visible) => {
      setModalVisible(visible);

      if (visible) {
        onShow && onShow();
      } else {
        onDismiss && onDismiss();
      }
    },
    [setModalVisible, onShow, onDismiss],
  );

  return (
    <Portal
      options={{
        portalType: 'Modal' as PortalType,
        visible: modalVisible,
        portalStyle: modalPortalStyle,
        overlayStyle: modalOverlayStyle,
      }}
      onOverlay={() => onModalVisibleChange(false)}
    >
      <Card full>{children}</Card>
    </Portal>
  );
};
