import React, { createContext, useState, FC } from 'react';
import classNames from 'classnames';
import { MenuItem, IMenuItemProps } from './menuItem';
import { SubMenu, ISubMenuProps } from './subMenu';
import './menu.css';

type MenuMode = 'horizontal' | 'vertical';
type SelectCallback = (selectedIndex: string) => void;

interface IMenuContext {
  index: string;
  onSelect?: SelectCallback;
  mode?: MenuMode;
  defaultOpenKeys?: string[];
}

export interface IMenuProps {
  defaultIndex?: string;
  className?: string;
  style?: React.CSSProperties;
  mode?: MenuMode;
  onSelect: SelectCallback;
  defaultOpenKeys?: string[];
}

export const MenuContext = createContext<IMenuContext>({ index: '0' });

interface FC_CUSTOM<T> extends FC<T> {
  Item: FC<IMenuItemProps>;
  SubMenu: FC<ISubMenuProps>;
}

export const Menu: FC_CUSTOM<IMenuProps> = (props) => {
  const {
    defaultIndex,
    className,
    mode,
    style,
    onSelect,
    children,
    defaultOpenKeys,
  } = props;

  const classes = classNames('demon-menu', className, {
    'demon-menu-vertical': mode === 'vertical',
    'demon-menu-horizontal': mode !== 'vertical',
  });

  const [currentIndex, setCurrentIndex] = useState(defaultIndex);
  const handleClick = (index: string) => {
    setCurrentIndex(index);
    onSelect && onSelect(index);
  };

  const contextValue: IMenuContext = {
    index: currentIndex || '0',
    onSelect: handleClick,
    mode,
    defaultOpenKeys,
  };

  const renderChildren = () => {
    const childrenComponent = React.Children.map(children, (child, index) => {
      const childElement = child as React.FunctionComponentElement<IMenuItemProps>;
      const { displayName } = childElement.type;
      if (displayName === 'MenuItem' || displayName === 'SubMenu') {
        return React.cloneElement(childElement, {
          index: `${index.toString()}`,
        });
      } else {
        console.error('子项只能用<Menu.Item> <Menu.SubMenu>标签');
      }
    });
    return childrenComponent;
  };

  return (
    <ul className={classes} style={style}>
      <MenuContext.Provider value={contextValue}>
        {renderChildren()}
      </MenuContext.Provider>
    </ul>
  );
};

Menu.defaultProps = {
  defaultIndex: '0',
  mode: 'horizontal',
  defaultOpenKeys: [],
};

Menu.Item = MenuItem;
Menu.SubMenu = SubMenu;
