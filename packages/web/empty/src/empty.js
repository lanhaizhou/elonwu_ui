import React from 'react';
import tw, { styled, css } from 'twin.macro';

import { Icon } from '@elonwu/web-icon';
import { Text } from '@elonwu/web-text';

import empty from './assets/empty.svg';

export const Empty = ({ icon, size, desc, style, descStyle, ...rest }) => {
  return (
    <EmptyContainer style={style} {...rest}>
      {icon ? (
        <Icon type="ghost" src={icon} size={size} />
      ) : (
        <img
          src={empty}
          alt="empty"
          style={{ width: size || 64, height: size || 64 }}
        />
      )}
      <Text style={descStyle}>{desc || '暂无数据'}</Text>
    </EmptyContainer>
  );
};

const EmptyContainer = styled.div(() => {
  return [
    tw`w-full h-full p-2`,
    tw`bg-gray-50`,
    tw`grid place-items-center place-content-center`,
  ];
});
