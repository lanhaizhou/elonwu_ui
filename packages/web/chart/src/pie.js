import React, { useCallback } from 'react';
import { registerShape } from '@antv/g2';

import { Chart, textStyle } from './base';

export const Pie = React.forwardRef(({ chartKey, ...props }, ref) => {
  // 渲染配置
  const configChart = useCallback(({ chart, source }) => {
    chart.clear(); // 由于地图的背景绘制也是 chart, 不能放到全局

    // 自动排序， 仅取前十
    chart.data(source.sort((prev, next) => prev.y - next.y).slice(0, 10));

    chart.coordinate('theta', { radius: 0.7, innerRadius: 0.55 });
    chart.axis(false);

    chart.interaction('element-active');

    chart.tooltip({
      showTitle: false,
      showMarkers: false,
    });

    chart.legend({
      position: 'bottom',
      itemValue: null,
    });

    // 可以通过调整这个数值控制分割空白处的间距，0-1 之间的数值
    const sliceNumber = 0.0025;

    // 自定义 other 的图形，增加两条线
    registerShape('interval', 'slicePie', {
      draw(cfg, container) {
        const points = cfg.points;
        let path = [];
        path.push(['M', points[0].x, points[0].y]);
        path.push(['L', points[1].x, points[1].y - sliceNumber]);
        path.push(['L', points[2].x, points[2].y - sliceNumber]);
        path.push(['L', points[3].x, points[3].y]);
        path.push('Z');
        path = this.parsePath(path);
        return container.addShape('path', {
          attrs: {
            fill: cfg.color,
            path,
          },
        });
      },
    });

    chart
      .interval()
      .adjust('stack')
      .position('y')
      .color('x')
      .label('x', () => ({
        content: ({ x, y, format = '' }) => `${x}${format ? ':' + format : ''}`,
        style: textStyle,
      }))
      .style({ stroke: 'transparent', strokeWidth: 10 })
      .shape(source.length > 2 ? 'slicePie' : 'pie')
      .state({
        active: {
          style: (element) => {
            const shape = element.shape;
            return {
              lineWidth: 6,
              stroke: shape.attr('fill'),
              strokeOpacity: shape.attr('fillOpacity'),
            };
          },
        },
      });
  }, []);

  return (
    <Chart
      ref={ref}
      chartKey={`Pie-${chartKey}`}
      configChart={configChart}
      {...props}
    />
  );
});
