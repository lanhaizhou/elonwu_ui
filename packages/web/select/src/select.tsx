import React, { CSSProperties, FC } from 'react';
import { OldSelect } from './oldSelect';
import { NewSelect } from './newSelect';
import { StylesConfig } from 'react-select';

type valueType = string | string[] | IOptions[];
type optionType = IOptions | IOptions[] | '';

export interface IOptions {
  label: string;
  value: string;
  disabled?: boolean;
  selected?: boolean;
}

interface ISelectProps {
  options: IOptions[];
  defaultValue?: valueType;
  multiple?: boolean;
  onChange?: (value?: valueType, option?: optionType) => void;
  isNew?: boolean;
  style?: CSSProperties;
}

interface INewSelectProps {
  disabled?: boolean;
  placeholder?: string;
  styles?: StylesConfig;
}

export type SelectProps = ISelectProps & INewSelectProps;

export const Select: FC<SelectProps> = (props) => {
  const { isNew = false, style } = props;
  return (
    <div style={style}>
      {isNew ? <NewSelect {...props} /> : <OldSelect {...props} />}
    </div>
  );
};
