import React, { createContext, useState, FC, ReactNode } from 'react';
import classNames from 'classnames';
import { MenuItem, IMenuItemProps } from './menuItem';
import { SubMenu, ISubMenuProps } from './subMenu';
import './menu.css';

type MenuMode = 'horizontal' | 'vertical';
type SelectCallback = (key: string) => void;

interface IMenuContext {
  key: string;
  onSelect?: SelectCallback;
  mode?: MenuMode;
  defaultOpenKeys?: string[];
  defaultSelectedKey?: string;
}

export interface IMenuProps {
  className?: string;
  style?: React.CSSProperties;
  mode?: MenuMode;
  onSelect?: SelectCallback;
  defaultOpenKeys?: string[];
  defaultSelectedKey?: string;
}

export const MenuContext = createContext<IMenuContext>({ key: '0' });

export const MenuMain: FC<IMenuProps> & {
  Item: FC<IMenuItemProps>;
  SubMenu: FC<ISubMenuProps>;
} = (props) => {
  const {
    className,
    mode,
    style,
    onSelect,
    children,
    defaultOpenKeys,
    defaultSelectedKey,
  } = props;

  const classes = classNames('demon-menu', className, {
    'demon-menu-vertical': mode === 'vertical',
    'demon-menu-horizontal': mode !== 'vertical',
  });

  const [currentKey, setCurrentKey] = useState(defaultSelectedKey);
  const handleClick = (key: string) => {
    setCurrentKey(key);
    onSelect && onSelect(key);
  };

  const contextValue: IMenuContext = {
    key: currentKey || '0',
    onSelect: handleClick,
    mode,
    defaultOpenKeys,
  };

  const renderChildren = () => {
    const childrenComponent = React.Children.map(children, (child, index) => {
      const childElement = child as React.FunctionComponentElement<IMenuItemProps>;
      const { displayName } = childElement.type;
      if (displayName === 'MenuItem') {
        return React.cloneElement(childElement, {
          index: `${index.toString()}`,
          Ike: childElement.key as string,
        });
      } else if (displayName === 'SubMenu') {
        return React.cloneElement(childElement, {
          index: `${index.toString()}`,
          Ike: childElement.key as string,
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

MenuMain.defaultProps = {
  mode: 'horizontal',
  defaultOpenKeys: [],
};

MenuMain.Item = MenuItem;
MenuMain.SubMenu = SubMenu;
