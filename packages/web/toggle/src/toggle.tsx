import React, {
  FC,
  useEffect,
  useMemo,
  useState,
  CSSProperties,
  useCallback,
} from 'react';
import classnames from 'classnames';
import {
  ButtonSelectSvg,
  ButtonUnSelectSvg,
  checkboxSelectSvg,
  checkboxUnSelectSvg,
} from './assets';
import './index.less';
import { Icon, IconSize } from '@elonwu/web-icon';
import { Text, TextSize } from '@elonwu/web-text';

export type ToggleType = 'radio' | 'checkbox' | 'switch';

export type ToggleSize = 'lg' | 'md' | 'sm';

interface IToggleProps {
  type: ToggleType;
  checkedText?: string;
  unCheckedText?: string;
  onChange?: (select: boolean) => void;

  size?: ToggleSize | number;
  style?: CSSProperties;
}

const types = {
  radio: [ButtonSelectSvg, ButtonUnSelectSvg],
  checkbox: [checkboxSelectSvg, checkboxUnSelectSvg],
};

export const Toggle: FC<IToggleProps> = (props) => {
  const {
    type,
    onChange,
    checkedText = '',
    unCheckedText = '',
    children,

    size,
    ...rest
  } = props;
  const [toggle, setToggle] = useState(false);

  const [selectSvg, unSelectSvg] = useMemo(() => types[type] || [], [type]);

  const switchClass = classnames('demon-switch', {
    'demon-switch-checked': toggle,
  });

  const checkedTexts = useMemo(() => {
    return checkedText.slice(0, 2);
  }, [checkedText]);

  const unCheckedTexts = useMemo(() => {
    return unCheckedText.slice(0, 2);
  }, [unCheckedText]);

  const handleClick = useCallback(() => {
    setToggle((prev) => {
      onChange && onChange(!prev);
      return !prev;
    });
  }, []);

  const renderChildren = (size: ToggleSize | number | undefined) => {
    return (
      <>
        {typeof children === 'string' ? (
          <Text size={(size || 'md') as TextSize}>{children}</Text>
        ) : (
          children
        )}
      </>
    );
  };

  const render = (type: ToggleType, size: ToggleSize | number | undefined) => {
    if (type === 'radio' || type === 'checkbox') {
      return (
        <>
          <Icon
            src={toggle ? selectSvg : unSelectSvg}
            type="ghost"
            size={(size || 'lg') as IconSize}
            style={{ fill: toggle ? '#1890ff' : '#d9d9d9' }}
            {...rest}
          />
          {renderChildren(size)}
        </>
      );
    } else if (type === 'switch') {
      return (
        <>
          <button type="button" className={switchClass}>
            <div className="demon-switch-handle"></div>
            <div className="demon-switch-inner">
              {toggle ? checkedTexts : unCheckedTexts}
            </div>
          </button>
          {renderChildren(size)}
        </>
      );
    }
  };
  return (
    <span className="demon-switch-wrapper" onClick={handleClick}>
      {render(type, size)}
    </span>
  );
};
