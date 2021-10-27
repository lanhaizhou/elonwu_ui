import React, {
  useMemo,
  FC,
  MutableRefObject,
  ReactElement,
  CSSProperties,
} from 'react';

import { createContext, TriggerEvent, usePortal } from '@elonwu/hooks';
import './drawer.css';

const { Provider, useContext } = createContext('Drawer');

export interface DrawerProps {
  visible?: boolean;
  onChange: (visible: boolean) => void;
  contentStyle?: CSSProperties;
  overlayStyle?: CSSProperties;

  parentRef?: MutableRefObject<HTMLElement>;

  trigger: ReactElement;
  triggerEvents?: TriggerEvent[];
}

export const Drawer: FC<DrawerProps> = ({
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
        placeContent: 'stretch flex-start',
        cursor: 'pointer',
      },
      overrideOverlayStyle,
    );
  }, [overrideOverlayStyle]);

  const { visible, onShow, onDismiss, portalContent } = usePortal({
    portalType: 'Drawer',
    content: children,
    overlayStyle,
    ...rest,
  });

  return (
    <Provider value={{ visible, onShow, onDismiss }}>{portalContent}</Provider>
  );
};

export const useDrawer = useContext;
