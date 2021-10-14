import React, { useContext } from 'react';
import classNames from 'classnames';
import { MenuContext } from './menu';
import IconComponent from './IconComponent';

export interface IMenuItemProps {
  index?: string;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
  icon?: React.ReactNode;
}

export const MenuItem: React.FC<IMenuItemProps> = (props) => {
  const { index, disabled, className = '', style, children, icon } = props;
  const { onSelect, index: ctxIndex } = useContext(MenuContext);

  const classes = classNames('demon-menu-item', className, {
    'is-disabled': disabled,
    'is-active selected-bg': ctxIndex === index && !disabled,
  });

  const handleClick = () => {
    // 切换菜单 有子菜单则给title标识
    onSelect && !disabled && typeof index === 'string' && onSelect(index);
  };

  return (
    <li className={classes} style={style} onClick={handleClick}>
      <IconComponent icon={icon} />
      {children}
    </li>
  );
};

MenuItem.displayName = 'MenuItem';
