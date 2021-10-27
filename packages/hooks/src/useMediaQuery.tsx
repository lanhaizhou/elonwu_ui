import React, { useState, useEffect, ReactNode } from 'react';
import { debounce } from '@elonwu/utils';

import { createContext } from './createContext';

const { Provider, useContext: useMediaQuery } = createContext('MediaQuery');

const MediaQueryProvider = ({
  children,
  limits = [768, 1024, 1440, 1920],
}: {
  children: ReactNode;
  limits?: number[];
}) => {
  const [matchList, setMatchList] = useState<boolean[]>([]);

  useEffect(() => {
    const mediaQueryStrList = genMediaQueryStr(limits);

    if (!mediaQueryStrList?.length) return;

    const mediaList = mediaQueryStrList.map(window.matchMedia);

    console.log(mediaList);
    // 首次判断
    if (matchList.every((match) => match === false)) {
      setMatchList(mediaList.map((m) => m.matches));
    }

    // 保存全部监听函数， 用于移除监听
    const onChangeList = mediaList.map((media, i) => {
      // 防抖
      const onChange = debounce((ev) => {
        if (ev.matches) {
          // 只有一个 true, 无需更细致的判断
          const matchList: boolean[] = Array(mediaList.length).fill(false);
          matchList[i] = true;
          setMatchList(matchList);
        }
      }, 20);

      // 监听变化
      media.addEventListener('change', onChange);
      return onChange;
    });

    return () => {
      // 卸载 hook 时移除监听
      mediaList.forEach((currMedia, i) =>
        currMedia.removeEventListener('change', onChangeList[i]),
      );
    };
  }, []);

  return <Provider value={matchList}>{children}</Provider>;
};

const genMediaQueryStr = (list: number[]) => {
  let result: string[] = [];
  if (!Array.isArray(list) || list.length === 0) return result;

  // 去重 => 只保留数字 => 排序
  const limits = Array.from(new Set(list))
    .map((el) => Number(el))
    .filter((el) => !isNaN(el) && el > 0)
    .sort((a, b) => a - b);

  if (limits.length === 0) return result;

  // 第一个点
  result.push(`(max-width: ${limits[0]}px)`);

  // 中间点
  for (let i = 0; i < limits.length - 1; i++) {
    const prev = limits[i],
      next = limits[i + 1] - 1;
    result.push(`(min-width: ${prev}px) and (max-width: ${next}px)`);
  }

  // 结束点
  result.push(`(min-width: ${limits[limits.length - 1]}px)`);

  return result;
};

export { MediaQueryProvider, useMediaQuery };
