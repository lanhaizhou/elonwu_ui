import tw, { styled } from 'twin.macro';
/**
 *  Tag
 */
export const Tag = styled.span(() => {
  const styles = [
    tw`inline-block w-auto h-auto mx-auto py-2 px-4`,
    /* 装饰 */
    tw`shadow-sm hover:shadow-md rounded-md`,
    /* 背景色 */
    tw`bg-white text-gray-500 dark:bg-gray-800`,
    /* 切换 theme */
    tw`transition-all`,
  ];
  return styles;
});
