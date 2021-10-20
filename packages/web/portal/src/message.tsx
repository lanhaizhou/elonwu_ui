import React, {
  useMemo,
  useEffect,
  FC,
  MutableRefObject,
  ReactElement,
  CSSProperties,
} from 'react';

import { createContext, TriggerEvent, usePortal } from '@elonwu/hooks';

import './message.css';

const { Provider, useContext } = createContext('Message');

export interface MessageProps {
  visible?: boolean;
  onChange: (visible: boolean) => void;
  contentStyle?: CSSProperties;
  overlayStyle?: CSSProperties;

  parentRef?: MutableRefObject<HTMLElement>;

  trigger: ReactElement;
  triggerEvents?: TriggerEvent[];
}

export const Message: FC<MessageProps> = ({
  overlayStyle: overrideOverlayStyle,
  parentRef,
  children,
  ...rest
}) => {
  const overlayStyle = useMemo(() => {
    return Object.assign(
      {
        display: 'grid',
        placeContent: 'center',
        gap: 16,
        padding: 16,
      },
      overrideOverlayStyle,
    );
  }, [overrideOverlayStyle]);

  const { visible, onShow, onDismiss, portalContent } = usePortal({
    portalType: 'Message',
    content: children,
    overlayStyle,
    ...rest,
  });

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    if (visible) timer = setTimeout(onDismiss, 2000);

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [visible, onDismiss]);

  return (
    <Provider value={{ visible, onShow, onDismiss }}>{portalContent}</Provider>
  );
};

export const useMessage = useContext;
