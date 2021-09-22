import tw, { styled, css, theme } from 'twin.macro';
/**
 *  Card
 */
const Card = styled.div(({ full = false }) => {
  const styles = [
    tw`inline-block w-auto h-auto mx-auto  p-4`,
    /* 装饰 */
    tw`shadow-sm hover:shadow-lg rounded-xl`,
    /* 背景色 */
    tw`bg-white dark:bg-gray-800`,
    /* 切换 theme */
    tw`transition-all`,
  ];

  if (full) {
    styles.push(tw`block`);
  }

  return styles;
});

export default Card;
