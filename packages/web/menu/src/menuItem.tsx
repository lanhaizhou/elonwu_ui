import React, { useContext, useState } from 'react';
import classNames from 'classnames';
import { MenuContext } from './menuMain';
import Icons from './icons';

export interface IMenuItemProps {
  index?: string;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
  icon?: React.ReactNode;
  Ike?: string;
  defaultSelected?: boolean;
}

export const MenuItem: React.FC<IMenuItemProps> = (props) => {
  const { index, disabled, className = '', style, children, icon, Ike } = props;
  const { onSelect, key: ctxKey } = useContext(MenuContext);

  const classes = classNames('demon-menu-item', className, {
    'is-disabled': disabled,
    'is-active selected-bg': ctxKey === Ike && !disabled,
  });

  const handleClick = () => {
    // 切换菜单 有子菜单则给title标识
    onSelect &&
      !disabled &&
      typeof index === 'string' &&
      onSelect(Ike as string);
  };

  return (
    <li className={classes} style={style} onClick={handleClick}>
      <Icons icon={icon} />
      {children}
    </li>
  );
};

MenuItem.displayName = 'MenuItem';
