import React, { useCallback } from 'react';
import { Chart, ChartRenderer, ChartProps } from './base';

export const LineGroup = React.forwardRef(
  ({ chartKey, ...props }: ChartProps, ref) => {
    // 渲染配置
    const configChart = useCallback<ChartRenderer>(({ chart, source }) => {
      chart.data(source);

      chart.tooltip({
        showTitle: true,
        showMarkers: false,
        shared: true,
        showCrosshairs: true,
        crosshairs: {
          type: 'xy',
          follow: true,
          line: {
            style: {
              opacity: 0.5,
              stroke: '#164196',
              lineDash: [6, 6, 6],
            },
          },
        },
      });
      // 绘制多个折线图
      chart.line().position('x*y').color('z').size(3).shape('smooth');
      // 绘制点图
      chart.point().position('x*y').size(2).tooltip(false);

      chart.legend({
        position: 'bottom',
      });
    }, []);

    return (
      <Chart
        ref={ref}
        // @ts-ignore
        chartKey={`LineGroup-${chartKey}`}
        configChart={configChart}
        {...props}
      />
    );
  },
);
