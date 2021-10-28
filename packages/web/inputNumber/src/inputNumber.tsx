import React, { FC, useEffect, useState } from 'react';
import RCInputNumber, { InputNumberProps } from 'rc-input-number';
import './index.less';

export const InputNumber: FC<InputNumberProps> = (props) => {
  return <RCInputNumber {...props} />;
};
