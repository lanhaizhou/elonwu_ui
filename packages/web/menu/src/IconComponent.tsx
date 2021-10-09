import React, { ReactNode } from 'react';

const IconComponent = (props: {
  icon?: React.ReactNode;
}): React.ReactElement => {
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
      {icon}
    </span>
  );
};

export default IconComponent;
