import React, { FC } from 'react';
import classNames from 'classnames';
import './index.less';

export interface ITabPaneProps {
  tab: string;
  key: string;
  isActive?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export const TabPane: FC<ITabPaneProps> = (props) => {
  const { tab, key, children, isActive = false, className, style } = props;

  const classes = classNames('demon-tabs-tabpane', className, {
    'demon-tabs-tabpane-active': isActive,
  });

  return (
    <div className={classes} style={style} key={`${tab}${key}`}>
      {children}
    </div>
  );
};

TabPane.displayName = 'TabPane';
