import tw, { styled, css } from 'twin.macro';
/**
 *  Button
 */
const Button = styled.button(
  ({ type = 'fill', size = 'md', round = false, block = false }) => {
    const styles = [
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

    const sizes = {
      lg: tw`text-lg px-8 py-3`,
      md: tw`text-base px-4 py-2 rounded-md`,
      sm: tw`text-xs px-2 py-1 rounded-sm`,
    };

    const types = {
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

    if (sizes[size]) {
      styles.push(sizes[size]);
    }

    if (types[type]) {
      styles.push(types[type]);
    }

    if (round) {
      styles.push(tw`rounded-full`);
    }

    if (block) {
      styles.push(tw`w-full`);
    }

    return styles;
  },
);

export default Button;
