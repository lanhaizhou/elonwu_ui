import React, {
  useMemo,
  FC,
  MutableRefObject,
  ReactElement,
  CSSProperties,
} from 'react';

import {
  createContext,
  TriggerEvent,
  usePortal,
  Position,
} from '@elonwu/hooks';

import './popover.css';

const { Provider, useContext } = createContext('MediaQuery');

export interface PopoverProps {
  visible?: boolean;
  onChange: (visible: boolean) => void;
  contentStyle?: CSSProperties;
  overlayStyle?: CSSProperties;

  parentRef?: MutableRefObject<HTMLElement>;

  trigger: ReactElement;
  triggerEvents?: TriggerEvent[];
  position?: Position;
}

export const Popover: FC<PopoverProps> = ({
  overlayStyle: overrideOverlayStyle,
  parentRef,
  children,
  position = 'bottomLeft',
  ...rest
}) => {
  const overlayStyle = useMemo(() => {
    return Object.assign(
      {
        display: 'grid',
        placeContent: 'stretch',
      },
      overrideOverlayStyle,
    );
  }, [overrideOverlayStyle]);

  const { visible, onShow, onDismiss, portalContent } = usePortal({
    portalType: 'Popover',
    content: children,
    overlayStyle,
    position,
    ...rest,
  });

  return (
    <Provider value={{ visible, onShow, onDismiss }}>{portalContent}</Provider>
  );
};

export const usePopover = useContext;
