import React, { useCallback } from 'react';
import { Chart } from './base';

export const BarStack = React.forwardRef(({ chartKey, ...props }, ref) => {
  // 渲染配置
  const configChart = useCallback(({ chart, source }) => {
    // 堆叠时， 自动排序
    chart.data(source.slice().sort((prev, next) => next.y - prev.y));

    chart.scale('y', { nice: true });
    chart.coordinate().transpose();

    // 绘制堆叠的条形图
    chart
      .interval()
      .position('x*y')
      .style({ radius: [2, 2, 2, 2] })
      .adjust('stack')
      .color('z');
  }, []);

  return (
    <Chart
      ref={ref}
      chartKey={`BarStack-${chartKey}`}
      configChart={configChart}
      {...props}
    />
  );
});
