import React, { FC } from 'react';
import RCTextArea, { TextAreaProps } from 'rc-textarea';
import './index.less';

export const TextArea: FC<TextAreaProps> = (props) => {
  return <RCTextArea {...props} />;
};
