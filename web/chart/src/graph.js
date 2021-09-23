import React, { useCallback } from 'react';
import * as DataSet from '@antv/data-set';

import { Chart, isFunction } from './base';

const defaultStyle = () => ({});

export const Graph = React.forwardRef(
  ({ chartKey, labelStyle, connectStyle, sort = true, ...props }, ref) => {
    // 渲染配置
    const configChart = useCallback(({ chart, source }) => {
      chart.clear();

      // arc diagram layout
      const ds = new DataSet();
      const dv = ds.createView().source(source, {
        type: 'graph',
        edges: (d) => d.links,
      });
      dv.transform({
        type: 'diagram.sankey',
        nodeWidth: 0.008,
        nodePadding: 0.03,
        // 默认降序排列
        sort: sort ? (a, b) => (a.value >= b.value ? 0 : -1) : () => 0,
      });

      const edges = dv.edges.map((edge) => {
        return {
          source: edge.source.name,
          target: edge.target.name,
          name: edge.source.name,
          x: edge.x,
          y: edge.y,
          value: edge.value,
        };
      });

      const nodes = dv.nodes.map((node) => {
        return {
          x: node.x,
          y: node.y,
          name: node.name,
        };
      });

      // ============= 绘图
      chart.legend(false);

      chart.axis(false);

      chart.tooltip({
        showTitle: false,
        showMarker: false,
        showCrosshairs: false,
      });

      chart.scale({
        x: { sync: true, nice: true },
        y: { sync: true, nice: true },
        source: { sync: 'color' },
        name: { sync: 'color' },
      });

      // node view
      const nodeView = chart.createView();
      nodeView.data(nodes);
      nodeView
        .polygon()
        .position('x*y')
        .color('name')
        .label('x*name', (x, name) => {
          const isLast = x[1] === 1;
          return {
            style: {
              fill: '#545454',
              textAlign: isLast ? 'end' : 'start',
            },
            offsetX: isLast ? -8 : 8,
            content: name,
          };
        })
        .tooltip(false)
        .style('name', isFunction(labelStyle) ? labelStyle : defaultStyle); // label 格式化

      // edge view
      const edgeView = chart.createView();
      edgeView.data(edges);

      edgeView
        .edge()
        .position('x*y')
        .shape('arc')
        .color('name')
        .tooltip('target*source*value', (target, source, value) => {
          return {
            // name: source + ' to ' + target,
            name: target === '产出' ? source : target,
            value,
          };
        })
        .style(
          'source*target',
          isFunction(connectStyle) ? connectStyle : defaultStyle,
        )
        .state({
          active: {
            style: {
              opacity: 0.8,
              lineWidth: 0,
            },
          },
        });
    }, []);

    return (
      <Chart
        ref={ref}
        chartKey={`Graph-${chartKey}`}
        configChart={configChart}
        {...props}
      />
    );
  },
);
