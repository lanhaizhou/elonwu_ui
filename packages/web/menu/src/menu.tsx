import React, { ReactNode, useCallback, FC } from 'react';
import { IMenuProps, MenuMain } from './menuMain';
import { Popover } from '@elonwu/web-popover';

interface IMenuDataProps {
  key?: string;
  name?: string;
  icon?: string;
  disabled?: boolean;
  subMenus?: IMenuDataProps[];
  showSubMenus?: boolean;
  render?: (record: IMenuDataProps) => ReactNode;
}

export interface IMenuCMPProps extends IMenuProps {
  data: IMenuDataProps[];
  popover?: boolean;
}

export const Menu: FC<IMenuCMPProps> = (props) => {
  const { data, popover } = props;

  const renderMenu = useCallback(
    (oriData: IMenuDataProps[]) => {
      const node = oriData.map((item) => {
        const {
          key,
          name,
          icon,
          disabled,
          subMenus,
          showSubMenus,
          render,
        } = item;
        if (subMenus && subMenus.length > 0) {
          return popover ? (
            <Popover
              position="rightBottom"
              trigger={<MenuMain.SubMenu key={key} title={name} />}
              style={{ width: '100%' }}
              contentStyle={{ width: 120 }}
            >
              {renderMenu(subMenus)}
            </Popover>
          ) : (
            <MenuMain.SubMenu
              key={key}
              title={name}
              showSubMenus={showSubMenus}
            >
              {renderMenu(subMenus)}
            </MenuMain.SubMenu>
          );
        } else {
          return (
            <MenuMain.Item
              key={key}
              disabled={disabled}
              icon={render ? '' : icon}
            >
              {render ? render({ ...item }) : name}
            </MenuMain.Item>
          );
        }
      });
      return node;
    },
    [popover],
  );

  return (
    <div>
      <MenuMain {...props}>{renderMenu(data)}</MenuMain>
    </div>
  );
};
