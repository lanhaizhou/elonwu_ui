import React, { FC, useState, CSSProperties } from 'react';
import RcCascader, { DataNode, CascaderProps } from 'rc-cascader';
import 'rc-cascader/assets/index.less';
import './index.less';

interface ICascaderProps {
  className?: string;
  style?: CSSProperties;
  placeholder?: string;
}

type CascaderType = ICascaderProps & CascaderProps;

export const Cascader: FC<CascaderType> = (props) => {
  const { onChange: propsOnChange, className, style, placeholder } = props;
  const [inputValue, setInputValue] = useState('');
  const onChange = (value: any, selectedOptions: any) => {
    const v = selectedOptions.map((o: any) => o.label).join('/ ');
    setInputValue(v);
    propsOnChange && propsOnChange(value, selectedOptions);
  };

  return (
    <div>
      <RcCascader {...props} onChange={onChange}>
        <input
          className={className}
          style={{ ...style }}
          placeholder={placeholder}
          value={inputValue}
          readOnly
        />
      </RcCascader>
    </div>
  );
};
