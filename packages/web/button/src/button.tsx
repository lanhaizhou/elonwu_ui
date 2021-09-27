import tw, { styled, css, TwStyle } from 'twin.macro';
import { SerializedStyles } from '@emotion/cache/node_modules/@emotion/utils';
/**
 *  Button
 */

export type ButtonType = 'fill' | 'outline' | 'ghost';
export type ButtonSize = 'lg' | 'md' | 'sm';

export type StyleProps = (SerializedStyles | TwStyle)[];

export interface ButtonProps {
  type?: ButtonType;
  size?: ButtonSize;
  round?: boolean;
  block?: boolean;
}

export const Button = styled.button<ButtonProps>(
  ({ type = 'fill', size = 'md', round, block }: ButtonProps): StyleProps => {
    let styles: StyleProps = [
      css`
        appearance: none;
      `,
      /* 盒子模型 */
      tw`text-base px-4 py-2 rounded-md`,
      /* 文本 */
      tw`font-serif select-none`,
      /* 切换 theme */
      tw`transition-all`,
      tw`cursor-pointer`,
    ];

    const sizes: { [key in ButtonSize]: TwStyle } = {
      lg: tw`text-lg px-8 py-3`,
      md: tw`text-base px-4 py-2 rounded-md`,
      sm: tw`text-xs px-2 py-1 rounded-sm`,
    };

    const types: { [key in ButtonType]: TwStyle | StyleProps } = {
      /* 填充 */
      fill: [
        /* 装饰 */
        tw`border-0 shadow-md focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-opacity-75`,

        /* 浅色 */
        tw`bg-primary-500 text-white hover:bg-primary-700`,

        /* 深色 */
        tw`dark:bg-primary-100 dark:text-primary dark:hover:bg-gray-100`,
      ],

      /* 描边 */
      outline: [
        /* 装饰 */
        tw`border border-primary-200 shadow-md focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-opacity-75`,

        /* 浅色 */
        tw`bg-white text-primary-500 border-solid border-primary-500 hover:bg-primary-100 hover:text-gray-50`,

        /* 深色 */
        tw`dark:bg-white dark:text-primary-500 dark:border-primary-500 dark:hover:bg-primary-100 dark:hover:text-gray-50`,
      ],

      /* ghost */
      ghost: [
        /* 浅色 */
        tw`border-0 bg-transparent text-primary-300  hover:bg-gray-100 hover:text-primary-500`,

        /* 深色 */
        tw`dark:text-white dark:hover:bg-primary-100 dark:hover:text-primary-500`,
      ],
    };

    styles = styles.concat(sizes[size] || sizes.md);

    styles = styles.concat(types[type] || types.fill);

    if (round) {
      styles = styles.concat(tw`rounded-full`);
    }

    if (block) {
      styles = styles.concat(tw`w-full`);
    }

    return styles;
  },
);
