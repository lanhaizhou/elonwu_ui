import React, { ReactNode } from 'react';
import { Icon } from '@elonwu/web-icon';

const IconComponent = (props: { icon: string }): React.ReactElement => {
  const { icon } = props;
  return (
    <span
      style={{
        width: 40,
        display: icon ? 'flex' : 'none',
        alignItems: 'center',
        justifyContent: 'flex-start',
      }}
    >
      <Icon size={'md'} src={icon} />
    </span>
  );
};

export default IconComponent;
