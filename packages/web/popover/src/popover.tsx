import React, { FC, ReactNode, CSSProperties } from 'react';
import './style.less';

import { Position } from '@elonwu/hooks';

export interface PopoverPorps {
  trigger: ReactNode;
  position?: Position;
  style?: CSSProperties;
  contentStyle?: CSSProperties;
}

export const Popover: FC<PopoverPorps> = ({
  position = 'bottom',
  trigger,
  children,
  contentStyle,
  ...rest
}) => {
  return (
    <div className="popoverContainer" {...rest}>
      {trigger}
      <div className={`popover ${position}`}>
        <div className="content" style={contentStyle}>
          {children}
        </div>
      </div>
    </div>
  );
};
