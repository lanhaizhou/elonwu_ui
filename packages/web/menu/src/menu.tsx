import React, { ReactNode, useEffect, useState } from 'react';
import { IMenuProps, MenuMain } from './menuMain';

interface IMenuDataProps {
  key?: string;
  name?: string;
  icon?: ReactNode;
  disabled?: boolean;
  subMenus?: IMenuDataProps[];
  showSubMenus?: boolean;
  defaultSelected?: boolean;
}

export interface IMenuCMPProps extends IMenuProps {
  data: IMenuDataProps[];
}

export const Menu = (props: IMenuCMPProps) => {
  const { data } = props;

  const renderMenu = (oriData: IMenuDataProps[]) => {
    const node = oriData.map((item) => {
      const { key, name, icon, disabled, subMenus, showSubMenus } = item;
      if (subMenus && subMenus.length > 0) {
        return (
          <MenuMain.SubMenu key={key} title={name} showSubMenus={showSubMenus}>
            {renderMenu(subMenus)}
          </MenuMain.SubMenu>
        );
      } else {
        return (
          <MenuMain.Item
            key={key}
            disabled={disabled}
            icon={icon}
            defaultSelected={item.defaultSelected}
          >
            {name}
          </MenuMain.Item>
        );
      }
    });
    return node;
  };

  return (
    <div>
      <MenuMain {...props}>{renderMenu(data)}</MenuMain>
    </div>
  );
};
