import React, { FC, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { TabPane, ITabPaneProps } from './tabPane';
import './index.less';

export interface ITabsProps {
  defaultActiveKey?: string;
  className?: string;
  style?: React.CSSProperties;
  onChange?: (key: string) => void;
  centered?: boolean;
  tabPosition?: string;
}

export const Tabs: FC<ITabsProps> & { TabPane: FC<ITabPaneProps> } = (
  props,
) => {
  const {
    children,
    defaultActiveKey,
    className,
    style,
    onChange,
    centered,
    tabPosition = 'top',
  } = props;
  const [activeKey, setActiveKey] = useState(defaultActiveKey);
  const tabsRef: any = useRef();
  const navRef: any = useRef();
  let defaultKeyFlag = defaultActiveKey ? true : false;
  let defaultKey = '';

  const tabsClass = classNames('demon-tabs', className, {
    'ant-tabs-top': tabPosition === 'top',
    'ant-tabs-left': tabPosition === 'left',
  });
  const wrapClass = classNames('demo-tabs-nav-wrap', {
    'demo-tabs-nav-wrap-center': centered,
  });

  const handleClick = (key: string, disabled: boolean): void => {
    if (disabled) return;
    setActiveKey(key);
    onChange && onChange(key);
  };

  useEffect(() => {
    setActiveKey(defaultKey);
  }, [defaultKeyFlag]);

  const renderNav = () => {
    const childrenComponent = React.Children.map(children, (child, index) => {
      const childElement = child as React.FunctionComponentElement<ITabPaneProps>;
      if (childElement.type.displayName === 'TabPane') {
        const navClass = classNames('demon-tabs-tab', '', {
          'demon-tabs-tab-active': activeKey === childElement.key,
          'demon-tabs-tab-disabled': childElement.props?.disabled,
        });
        if (!defaultKeyFlag) {
          // 不传默认值，则默认选中第一项
          defaultKey = String(childElement.key);
          defaultKeyFlag = true;
        }
        return (
          <div
            key={childElement.key}
            className={navClass}
            onClick={() =>
              handleClick(
                String(childElement.key),
                childElement.props?.disabled || false,
              )
            }
          >
            {childElement.props.tab}
          </div>
        );
      } else {
        console.error('子项只能用<Tabs.TabPane>标签');
      }
    });
    return childrenComponent;
  };

  const renderContent = () => {
    const childrenComponent = React.Children.map(children, (child, index) => {
      const childElement = child as React.FunctionComponentElement<ITabPaneProps>;
      if (childElement.type.displayName === 'TabPane') {
        return React.cloneElement(childElement, {
          isActive: childElement.key === activeKey ? true : false,
        });
      }
    });
    return childrenComponent;
  };

  useEffect(() => {
    const { current } = navRef;
    const scrollFunc = (event: {
      preventDefault: () => void;
      deltaY: number;
    }) => {
      event.preventDefault();
      if (tabPosition === 'top') {
        current.scrollLeft += event?.deltaY;
      } else if (tabPosition === 'left') {
        current.scrollTop += event?.deltaY;
      }
    };
    current.addEventListener('wheel', scrollFunc, false);
    return () => {
      current.removeEventListener('wheel', scrollFunc, false);
    };
  }, []);

  return (
    <div className={tabsClass} style={style} ref={tabsRef}>
      <div className="demon-tabs-nav">
        <div className={wrapClass}>
          <div className="demon-tabs-nav-list tabPosition" ref={navRef}>
            {renderNav()}
          </div>
        </div>
      </div>
      <div className="demon-tabs-content">{renderContent()}</div>
    </div>
  );
};

Tabs.TabPane = TabPane;
