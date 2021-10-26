import React from 'react';

import { Card } from '@elonwu/web';
import { MediaQueryProvider, useMediaQuery } from '../src';

export default {
  title: 'Hooks/useMediaQuery',
};

export const UseMediaQueryStory = () => {
  return (
    <MediaQueryProvider>
      <Page1 />
      <Page2 />
      <Page3 />
    </MediaQueryProvider>
  );
};

const Page1 = () => {
  const [isMobile, isTablet] = useMediaQuery();
  return <Card>isMobile: {isMobile ? 'true' : 'fasle'}</Card>;
};

const Page2 = () => {
  const [isMobile, isTablet] = useMediaQuery();
  return <Card>isTablet: {isTablet ? 'true' : 'fasle'}</Card>;
};

const Page3 = () => {
  const [isMobile, isTablet, isPC] = useMediaQuery();
  return (
    <>
      <Card>isPC: {isPC ? 'true' : 'fasle'}</Card>
      <Page4 />
    </>
  );
};

const Page4 = () => {
  const [isMobile, isTablet, isPC, isWideScreen] = useMediaQuery();
  return <Card>isWideScreen: {isWideScreen ? 'true' : 'fasle'}</Card>;
};
