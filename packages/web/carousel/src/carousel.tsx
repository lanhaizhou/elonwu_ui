import React, {
  ReactElement,
  useEffect,
  useMemo,
  useState,
  CSSProperties,
  FC,
  useCallback,
} from 'react';

import './style.less';

export interface CarouselPorps {
  items: ReactElement[];
  defaultActive?: number;
  style?: CSSProperties;
  onChange?: (active: number) => void;
  delay?: number;
  stylize?: any;
}

export const Carousel = ({
  items,
  delay = 1200,
  stylize,
  style,
}: CarouselPorps) => {
  const [active, setActive] = useState(2);

  useEffect(() => {
    const timer = setInterval(
      () => setActive((prev) => (prev + 1 < items.length ? prev + 1 : 0)),
      delay,
    );

    return () => clearInterval(timer);
  }, []);

  const calcItem = useCallback(
    (i) => {
      const len = items.length;
      const offsetLR = i - active;
      const offsetRL = offsetLR < 0 ? offsetLR + len : offsetLR - len;
      const offset =
        Math.abs(offsetLR) <= Math.abs(offsetRL) ? offsetLR : offsetRL;

      return { offset, absOffset: Math.abs(offset) };
    },
    [items, active],
  );

  return (
    <div className="carousel" style={style}>
      {items.map((item, i) => {
        const { offset, absOffset } = calcItem(i);

        return (
          <div
            key={i}
            className="carouselItem"
            style={{
              zIndex: items.length * 2 - absOffset,
            }}
          >
            {React.cloneElement(item, {
              style: Object.assign(
                {},
                item.props?.style,
                stylize({
                  offset,
                  absOffset,
                }),
              ),
            })}
          </div>
        );
      })}
    </div>
  );
};
