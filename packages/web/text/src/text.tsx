import tw, { styled, css, TwStyle } from 'twin.macro';
import { SerializedStyles } from '@emotion/cache/node_modules/@emotion/utils';

/**
 *  Text
 */
// 文本大小
export type TextSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

// 文本参数
interface TextProps {
  userSelect?: Boolean;
  ellipsis?: Boolean | Number;
  size?: TextSize;
}

// 链接装饰类型
export type LinkDecration = 'dot' | 'dash' | 'wave' | 'none' | 'underline';

// 链接参数
interface LinkProps extends TextProps {
  decration?: LinkDecration;
}

// 计算文本样式
const appendStyle = ({
  userSelect,
  ellipsis,
  size = 'md',
}: TextProps): (SerializedStyles | TwStyle)[] => {
  let styles: (SerializedStyles | TwStyle)[] = [];

  const sizes: { [key in TextSize]: TwStyle } = {
    xs: tw`text-xs leading-none`,
    sm: tw`text-sm leading-tight`,
    md: tw`text-base leading-normal`,
    lg: tw`text-lg leading-relaxed`,
    xl: tw`text-xl leading-loose`,
    '2xl': tw`text-2xl leading-loose font-normal`,
  };

  styles.push(sizes[size] || sizes.md);

  if (ellipsis) {
    if (typeof ellipsis === 'number' && ellipsis >= 2) {
      styles.push(css`
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: ${ellipsis};
        -webkit-box-orient: vertical;
        word-break: break-all;
      `);
    } else {
      styles.push(css`
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      `);
    }
  }

  if (userSelect) {
    styles.push(tw`select-text`);
  }

  return styles;
};

export const Text = styled.p<TextProps>(({ userSelect, ellipsis, size }) => {
  let styles: (SerializedStyles | TwStyle)[] = [
    // tw`font-notoSans font-normal`,
    tw`font-notoSerif font-normal`,
    tw`text-gray-700 dark:text-gray-50`,
    tw`select-none`,
  ];

  styles = styles.concat(appendStyle({ userSelect, ellipsis, size }));

  return styles;
});

export const Title = styled.h3<TextProps>(({ userSelect, ellipsis, size }) => {
  let styles: (SerializedStyles | TwStyle)[] = [
    // tw`font-notoSans font-semibold`,
    tw`font-notoSerif font-semibold`,
    tw`text-gray-700 dark:text-gray-50`,
    tw`select-none`,
  ];

  styles = styles.concat(appendStyle({ userSelect, ellipsis, size }));

  return styles;
});

export const Link = styled.a<LinkProps>(
  ({ userSelect, ellipsis, size, decration }) => {
    let styles: (SerializedStyles | TwStyle)[] = [
      css`
        text-underline-offset: 0.1em;
      `,
      // tw`font-notoSans font-normal`,
      tw`font-notoSerif font-normal`,
      tw`text-primary-300 hover:text-primary-400 active:text-primary-700`,
      tw`dark:text-gray-200 dark:hover:text-gray-50 active:text-gray-300`,
      tw`select-none`,
    ];

    styles = styles.concat(appendStyle({ userSelect, ellipsis, size }));

    switch (decration) {
      case 'dot':
        styles.push(
          css`
            text-decoration-style: dotted;
          `,
        );
        break;
      case 'dash':
        styles.push(
          css`
            text-decoration-style: dashed;
          `,
        );
        break;
      case 'wave':
        styles.push(
          css`
            text-decoration-style: wavy;
          `,
        );
        break;

      case 'none':
        styles.push(
          css`
            text-decoration: none;
          `,
        );
        break;

      case 'underline':
      default:
        styles.push(
          css`
            text-decoration-style: underline;
          `,
        );
        break;
    }

    return styles;
  },
);
