import tw, { styled, css } from 'twin.macro';
/**
 *  Text
 */

//  font-extralight	font-weight: 200;
//  font-normal	font-weight: 400;
//  font-semibold	font-weight: 600;
//  font-extrabold	font-weight: 800;

const appendStyle = ({ userSelect, ellipsis, size }) => {
  let styles = [];

  const sizes = {
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

export const Text = styled.p(({ userSelect, ellipsis, size }) => {
  let styles = [
    // tw`font-notoSans font-normal`,
    tw`font-notoSerif font-normal`,
    tw`text-gray-700 dark:text-gray-50`,
    tw`select-none`,
  ];

  styles = styles.concat(appendStyle({ userSelect, ellipsis, size }));

  return styles;
});

export const Title = styled.h3(({ userSelect, ellipsis, size }) => {
  let styles = [
    // tw`font-notoSans font-semibold`,
    tw`font-notoSerif font-semibold`,
    tw`text-gray-700 dark:text-gray-50`,
    tw`select-none`,
  ];

  styles = styles.concat(appendStyle({ userSelect, ellipsis, size }));

  return styles;
});

export const Link = styled.a(({ userSelect, ellipsis, size, decration }) => {
  let styles = [
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
});
