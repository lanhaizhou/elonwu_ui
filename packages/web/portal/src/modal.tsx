import React, {
  useMemo,
  FC,
  MutableRefObject,
  ReactElement,
  CSSProperties,
} from 'react';

import { createContext, TriggerEvent, usePortal } from '@elonwu/hooks';

const { Provider, useContext } = createContext('MediaQuery');

export interface ModalProps {
  visible?: boolean;
  onChange: (visible: boolean) => void;
  portalStyle?: CSSProperties;
  overlayStyle?: CSSProperties;

  parentRef?: MutableRefObject<HTMLElement>;

  trigger: ReactElement;
  triggerEvents?: TriggerEvent[];
}

export const Modal: FC<ModalProps> = ({
  overlayStyle: overrideOverlayStyle,
  parentRef,
  children,
  ...rest
}) => {
  const overlayStyle = useMemo(() => {
    return Object.assign(
      {
        height: '100vh',
        background: `rgba(0,0,0,.2)`,
        display: 'grid',
        placeContent: 'center',
        cursor: 'pointer',
      },
      overrideOverlayStyle,
    );
  }, [overrideOverlayStyle]);

  const { visible, onShow, onDismiss, portalContent } = usePortal({
    portalType: 'Modal',
    content: children,
    overlayStyle,
    ...rest,
  });

  return (
    <Provider value={{ visible, onShow, onDismiss }}>{portalContent}</Provider>
  );
};

export const useModal = useContext;
