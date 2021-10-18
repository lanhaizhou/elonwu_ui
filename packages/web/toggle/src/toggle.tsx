import React, { FC, useEffect, useMemo, useState } from 'react';
import classnames from 'classnames';
import {
  ButtonSelectSvg,
  ButtonUnSelectSvg,
  checkboxSelectSvg,
  checkboxUnSelectSvg,
} from './assets';
import './index.less';
import { Icon, IconProps } from '@elonwu/web-icon';
import { Text } from '@elonwu/web-text';

type iconType = 'radio' | 'checkbox' | 'switch';
interface IToggleProps extends Pick<IconProps, 'size' | 'style'> {
  type: iconType;
  checkedText?: string;
  unCheckedText?: string;
  onChange?: (select: boolean) => void;
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
    ...rest
  } = props;
  const [toggle, setToggle] = useState(false);
  const [selectSvg, setSelectSvg] = useState('');
  const [unSelectSvg, setUnSelectSvg] = useState('');

  const switchClass = classnames('demon-switch', {
    'demon-switch-checked': toggle,
  });

  const checkedTexts = useMemo(() => {
    return checkedText.slice(0, 2);
  }, [checkedText]);

  const unCheckedTexts = useMemo(() => {
    return unCheckedText.slice(0, 2);
  }, [unCheckedText]);

  const handleClick = () => {
    setToggle(!toggle);
    onChange && onChange(!toggle);
  };

  const renderChildren = () => {
    return (
      <>{typeof children === 'string' ? <Text>{children}</Text> : children}</>
    );
  };

  const render = (type: iconType) => {
    if (type === 'radio' || type === 'checkbox') {
      return (
        <>
          <Icon
            src={toggle ? selectSvg : unSelectSvg}
            type="ghost"
            size="lg"
            style={{ fill: toggle ? '#1890ff' : '#d9d9d9' }}
            {...rest}
          />
          {renderChildren()}
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
          {renderChildren()}
        </>
      );
    }
  };

  useEffect(() => {
    const [selectSrc, unSelectSrc] = types[type] || ['', ''];
    setSelectSvg(selectSrc);
    setUnSelectSvg(unSelectSrc);
  }, [type]);

  return (
    <span className="demon-switch-wrapper" onClick={handleClick}>
      {render(type)}
    </span>
  );
};
