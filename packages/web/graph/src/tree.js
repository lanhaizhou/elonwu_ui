import React, { useCallback } from 'react';
import { Chart } from './base';

export const Tree = React.forwardRef(({ chartKey, ...props }, ref) => {
  // 渲染配置
  const configChart = useCallback(({ chart, source }) => {
    // chart.clear();

    console.log({ source });

    chart.node(function (node) {
      let position = 'right';
      let rotate = 0;
      if (!node.children) {
        position = 'bottom';
        rotate = Math.PI / 2;
      }
      return {
        label: node.id,
        labelCfg: {
          position,
          offset: 5,
          style: {
            rotate,
            textAlign: 'start',
          },
        },
      };
    });

    chart.data(source);
  }, []);

  return (
    <Chart
      ref={ref}
      chartKey={`Tree-${chartKey}`}
      configChart={configChart}
      {...props}
    />
  );
});
