import React, { CSSProperties, useContext, useState } from 'react';
import classNames from 'classnames';
import { MenuContext } from './menuMain';
import { IMenuItemProps } from './menuItem';
import IconComponent from './icons';
import downSvg from '../stories/assets/down.svg';

export interface ISubMenuProps {
  index?: string;
  title?: string;
  className?: string;
  icon?: React.ReactNode;
  Ike?: string;
  showSubMenus?: boolean;
}

export const SubMenu: React.FC<ISubMenuProps> = (props) => {
  const { index, title, className = '', children, icon, showSubMenus } = props;
  const { key: ctxIndex, defaultOpenKeys, mode } = useContext(MenuContext);
  const openSubMenus = defaultOpenKeys as Array<string>;
  const isOpen =
    index && mode === 'vertical'
      ? showSubMenus || openSubMenus.includes(index)
      : false;
  const [menuOpen, setMenuOpen] = useState(isOpen);

  const classes = classNames('demon-menu-item demon-submenu-item', className, {
    'is-active': ctxIndex.substr(0, 1) === index,
  });

  const titleClasses = classNames('demon-submenu-title', className, {
    // 'title-is-active': ctxIndex.substr(0, 1) === index,
  });

  const arrowClasses = classNames('demon-submenu-arrow', className, {
    'rotate-vertical': mode === 'vertical' && menuOpen,
    'rotate-horizontal': mode === 'horizontal' && menuOpen,
  });

  let timer: any;
  const handleMouse = (e: React.MouseEvent, toggle: boolean) => {
    clearTimeout(timer);
    e.preventDefault();
    timer = setTimeout(() => {
      setMenuOpen(toggle);
    }, 300);
  };

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setMenuOpen(!menuOpen);
  };

  // 横向移入显示
  const hoverEvents =
    mode !== 'vertical'
      ? {
          onMouseEnter: (e: React.MouseEvent) => {
            handleMouse(e, true);
          },
          onMouseLeave: (e: React.MouseEvent) => {
            handleMouse(e, false);
          },
        }
      : {};

  // 纵向点击显示
  const clickEvents = mode === 'vertical' ? { onClick: handleClick } : {};

  const renderChildren = () => {
    const subMenuClasses = classNames('demon-submenu', className, {
      'demon-menu-opened': menuOpen,
    });
    const childrenComponent = React.Children.map(children, (child, i) => {
      const childElement = child as React.FunctionComponentElement<IMenuItemProps>;
      const { displayName } = childElement.type;
      if (displayName === 'MenuItem' || displayName === 'SubMenu') {
        return React.cloneElement(childElement, {
          index: `${index}-${i}`,
          Ike: childElement.key as string,
        });
      } else {
        console.error('只能用<Menu.Item> <Menu.SubMenu>标签');
      }
    });
    return <ul className={subMenuClasses}>{childrenComponent}</ul>;
  };

  // 小箭头样式
  const verticalArrowStyle = {
    width: 15,
    height: 15,
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    right: 10,
  };

  const horizontalArrowStyle = { width: 15, height: 15 };

  return (
    <li key={index} className={classes} {...hoverEvents}>
      <div className={titleClasses} {...clickEvents}>
        <IconComponent icon={icon} />
        {title}
        <img
          className={arrowClasses}
          src={downSvg}
          alt=""
          style={
            mode === 'vertical'
              ? (verticalArrowStyle as CSSProperties)
              : (horizontalArrowStyle as CSSProperties)
          }
        />
      </div>
      {renderChildren()}
    </li>
  );
};

SubMenu.displayName = 'SubMenu';
