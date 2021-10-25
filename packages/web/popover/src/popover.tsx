import React, { FC, ReactNode, CSSProperties } from 'react';
import './style.css';

import { Position } from '@elonwu/hooks';

export interface PopoverPorps {
  position: Position;
  trigger: ReactNode;
  style: CSSProperties;
}

export const Popover: FC<PopoverPorps> = ({
  position,
  trigger,
  children,
  ...rest
}) => {
  return (
    <div className="popoverContainer" {...rest}>
      {trigger}
      <div className={`popover ${position}`}>
        <div className="content">{children}</div>
      </div>
    </div>
  );
};
