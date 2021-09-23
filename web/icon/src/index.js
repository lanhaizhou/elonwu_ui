import React, { useMemo } from 'react';
import SVG from 'react-inlinesvg';
import tw, { styled, css } from 'twin.macro';

/**
 *  图标
 */

// 组装
export const Icon = ({
  // 素材
  src,
  // 其他绑定
  ...rest
}) => (
  <IconContainer {...rest}>
    <IconSvg src={src} />
  </IconContainer>
);

/**
 * 图标背景
 */

const IconContainer = styled.span(
  ({
    type = 'fill', // 控制配色
    size, // 大小
    round, // 是否圆角
  }) => {
    const styles = [
      /* 盒子模型 */
      tw`inline-grid place-items-center rounded-md`,
      /* 切换 */
      tw`transition-all`,
      /* 默认大小 */
      tw`w-6 h-6 p-1`,
    ];

    const sizes = {
      sm: tw`w-4 h-4 p-0.5`,
      md: tw`w-6 h-6 p-1`,
      lg: tw`w-8 h-8 p-1.5`,
      xl: tw`w-10 h-10 p-2`,
    };

    const types = {
      /* 填充 */
      fill: [
        /* 浅色 */
        tw`bg-primary hover:bg-primary-700`,
        tw`fill-white hover:fill-gray`,

        /* 深色 */
        tw`dark:bg-primary-100 dark:hover:bg-gray-100`,
        tw`dark:fill-primary dark:hover:fill-gray`,
      ],

      /* 描边 */
      outline: [
        /* 浅色 */
        tw`bg-transparent border border-solid border-primary hover:bg-primary-100`,
        tw`fill-primary hover:fill-gray`,

        /* 深色 */
        tw`dark:bg-transparent dark:border-primary dark:hover:bg-primary-100`,
        tw`dark:fill-gray dark:hover:fill-primary`,
      ],

      /* ghost */
      ghost: [
        /* 浅色 */
        tw`bg-transparent hover:bg-gray-100`,
        tw`fill-primary hover:fill-light`,

        /* 深色 */
        tw`dark:bg-primary-100 dark:hover:bg-gray-100`,
        tw`dark:fill-gray dark:hover:fill-primary`,
      ],
    };

    styles.push(sizes[size] || sizes.md);
    styles.push(types[type] || types.fill);

    if (round) {
      styles.push(tw`rounded-full`);
    }

    return styles;
  },
);

/**
 * 图标
 */
const IconSvg = styled(SVG)(() => {
  const styles = [
    /* 选中 */
    tw`select-none`,
    /* 切换 theme */
    tw`transition-all duration-75`,

    tw`w-full h-full`,

    /* path 继承svg 的属性 */
    css`
      fill: inherit;
      & path {
        /* 也可以尝试 css 关键字 currentColor */
        fill: inherit;
        stroke: inherit;
        stroke-width: inherit;
      }
    `,
  ];

  return styles;
});
