import React, { useCallback, useEffect, useState } from 'react';
import { debounce } from '@elonwu/utils';

export const Clip = () => {
  // const [radius, setRadius] = useState(20);

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     setRadius((prev) => (prev === 20 ? 60 : 20));
  //   }, 1600);

  //   return () => clearInterval(timer);
  // }, []);

  const [clipPath, setClipPath] = useState(`circle(0% at 50% 50%)`);

  const onMouseMove = useCallback(
    // debounce(
    (e) => {
      const { offsetX, offsetY, target } = e.nativeEvent;
      const { width, height } = target.getBoundingClientRect();

      const radius = width / 5;

      setClipPath(`circle(${radius}% at ${offsetX}px ${offsetY}px)`);
    },
    // , 20),
    [],
  );

  return (
    <>
      <svg width={0} height={0} style={{ margin: 0 }}>
        <defs>
          <clipPath id="clip">
            {/* <circle cx={50} cy={50} r={40} fill="#aaa"></circle> */}

            <rect y="110" x="137" width="90" height="90" />
            <rect x="0" y="110" width="90" height="90" />
            <rect x="80" y="0" width="90" height="90" />
            <rect x="0" y="0" width="90" height="90" />
          </clipPath>
        </defs>
      </svg>

      <div
        style={{
          width: 200,
          height: 200,
          border: '1px solid #ededed',
        }}
        onMouseMove={onMouseMove}
        onMouseLeave={() => setClipPath(`circle(0% at 50% 50%)`)}
      >
        <div
          style={{
            height: '100%',
            backgroundImage: `url(https://images.unsplash.com/photo-1588815375466-e7d21013ddd3?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8MSUzQTF8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60)`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center cneter',
            // clipPath,
            clipPath: `url(#clip)`,
          }}
        ></div>
      </div>
    </>
  );
};
