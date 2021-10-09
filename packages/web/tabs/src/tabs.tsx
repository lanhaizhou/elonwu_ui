import React, {
  FC,
  LegacyRef,
  MutableRefObject,
  useEffect,
  useRef,
  useState,
} from 'react';
import classNames from 'classnames';
import { TabPane, ITabPaneProps } from './tabPane';
import './index.less';

interface FC_CUSTOM<T> extends FC<T> {
  TabPane: FC<ITabPaneProps>;
}

interface ITabsProps {
  defaultActiveKey: string;
  className?: string;
  style?: React.CSSProperties;
  onChange?: (key: string) => void;
}

export const Tabs: FC_CUSTOM<ITabsProps> = (props) => {
  const { children, defaultActiveKey, className, style, onChange } = props;
  const [activeKey, setActiveKey] = useState(defaultActiveKey);
  const divRef: any = useRef<LegacyRef<HTMLDivElement>>();

  const tabsClass = classNames('demon-tabs', className, {});

  const handleClick = (key: string) => {
    setActiveKey(key);
    onChange && onChange(key);
  };

  const renderNav = () => {
    const childrenComponent = React.Children.map(children, (child, index) => {
      const childElement = child as React.FunctionComponentElement<ITabPaneProps>;
      if (childElement.type.displayName === 'TabPane') {
        const navClass = classNames('demon-tabs-tab', '', {
          'demon-tabs-tab-active': activeKey === childElement.key,
        });
        return (
          <div
            key={childElement.key}
            className={navClass}
            onClick={() => handleClick(String(childElement.key))}
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
    const { current } = divRef as any;
    current.addEventListener(
      'wheel',
      (event: { preventDefault: () => void; deltaY: any }) => {
        event.preventDefault();
        current.scrollLeft += event.deltaY;
      },
    );
    return () => {};
  }, []);

  return (
    <div className={tabsClass} style={style}>
      <div className="demon-tabs-nav">
        <div className="demon-tabs-nav-list tabPosition" ref={divRef}>
          {renderNav()}
        </div>
      </div>
      <div className="demon-tabs-content">{renderContent()}</div>
    </div>
  );
};

Tabs.TabPane = TabPane;
