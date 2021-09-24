import React, { useCallback } from 'react';
import { Chart } from './base';

export const AreaStack = React.forwardRef(({ chartKey, ...props }, ref) => {
  // 渲染配置
  const configChart = useCallback(({ chart, source }) => {
    chart.data(source);

    // 绘制堆叠面积图
    chart.area().position('x*y').adjust('stack').color('z');

    chart.legend({
      position: 'bottom',
    });
  }, []);

  return (
    <Chart
      ref={ref}
      chartKey={`AreaStack-${chartKey}`}
      configChart={configChart}
      {...props}
    />
  );
});
